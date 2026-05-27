#!/usr/bin/env bash
#
# Catch typo-slugs in resource frontmatter before they ship.
#
# A kebab-case `author:` value in any src/resources/*.md frontmatter that
# isn't a key in src/_data/authors.yaml fails the build with a clear error
# pointing at the file and the bad slug.
#
# Scoped to src/resources/ on purpose — the byline macro that resolves slugs
# is only used by the resource layout. Legacy slug-keyed authorship elsewhere
# on the site (newsletters, guides, about.md) is handled by signatures.js
# and is NOT validated here.
#
# Plain-name strings (containing capitals, spaces, or quotes) are intentionally
# allowed for backward compatibility with existing resources.
#
# Run via: bun run verify:authors  (wired into the prebuild chain)

set -euo pipefail

YAML=src/_data/authors.yaml

if [ ! -f "$YAML" ]; then
  echo "❌ Expected $YAML but it doesn't exist."
  exit 1
fi

# Top-level keys in authors.yaml. Authors.yaml is a flat map: `slug:` at column 0.
known=$(awk '/^[a-z0-9][a-z0-9-]*:[[:space:]]*$/ { sub(":[[:space:]]*$",""); print }' "$YAML" | sort -u)

bad=()
while IFS= read -r match; do
  file="${match%%:*}"
  rest="${match#*:}"
  value=$(echo "$rest" | sed -E 's/^author:[[:space:]]*//' | tr -d '"' | xargs)
  # Only check kebab-case-looking slugs; ignore plain names.
  if [[ "$value" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
    if ! echo "$known" | grep -qx "$value"; then
      bad+=("$file → $value")
    fi
  fi
done < <(grep -rHE '^author:[[:space:]]*[a-z0-9][a-z0-9-]*[[:space:]]*$' src/resources/ --include='*.md' --include='*.njk' 2>/dev/null || true)

if [ "${#bad[@]}" -gt 0 ]; then
  echo "❌ Unknown author slug(s). Either add them to $YAML or fix the typo:"
  printf '   %s\n' "${bad[@]}"
  exit 1
fi

echo "✅ All kebab-case author: slugs resolve in $YAML."
