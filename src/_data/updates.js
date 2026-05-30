// Branded updates feed — sourced from local git tags.
//
// Host-agnostic on purpose. Works whether the canonical remote is
// GitHub, Gitea, or a tarball-deploy with no remote at all. As long as
// `git for-each-ref refs/tags` can read this repository, the page and
// the Atom feed at /updates.xml stay populated.
//
// Annotated tags (`git tag -a vX.Y.Z -m "..."`) become the release-notes
// source. Lightweight tags fall back to the underlying commit body so
// the page still renders sensibly when a tag was created without a
// message.

const { spawnSync } = require("child_process");
const path = require("path");

const UNIT = "\x1f";
const REC = "\x1e";

const FIELDS = [
  "%(refname:short)",
  "%(objecttype)",
  "%(creatordate:iso-strict)",
  "%(*objectname:short)",
  "%(objectname:short)",
  "%(subject)",
  "%(contents:body)",
];

module.exports = function () {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const format = FIELDS.join(UNIT) + REC;

  const tags = spawnSync(
    "git",
    [
      "for-each-ref",
      "--sort=-creatordate",
      `--format=${format}`,
      "refs/tags",
    ],
    { cwd: repoRoot, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  );

  if (tags.status !== 0) {
    console.warn(
      `[updates] git for-each-ref failed (status ${tags.status}): ${tags.stderr || "no stderr"}`,
    );
    return [];
  }

  return tags.stdout
    .split(REC)
    .map((r) => r.replace(/^\n/, ""))
    .filter((r) => r.includes(UNIT))
    .map((record) => {
      const [
        refname,
        objecttype,
        creatordate,
        annotatedSha,
        ownSha,
        subject,
        body,
      ] = record.split(UNIT);

      const isAnnotated = objecttype === "tag";
      const sha = (isAnnotated ? annotatedSha : ownSha) || "";

      let bodyText = (body || "").trim();
      if (!isAnnotated && !bodyText) {
        const log = spawnSync(
          "git",
          ["log", "-1", "--format=%b", sha],
          { cwd: repoRoot, encoding: "utf8" },
        );
        if (log.status === 0) {
          bodyText = log.stdout.trim();
        }
      }

      return {
        tag: refname,
        date: new Date(creatordate),
        title: subject || refname,
        body: bodyText,
        commit: sha.substring(0, 7),
        isAnnotated,
      };
    });
};
