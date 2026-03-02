---
layout: layouts/blog.njk
title: "Equipping the Wand: Local Development for a Lovable Project"
hero: /assets/images/heroes/code.jpg
hero_alt: "HTML and JavaScript code on a dark screen"
hero_caption: "Photo: Wikimedia Commons, CC BY-SA 4.0"
tags:
  - education
date: 2026-02-26T12:08:00.000-01:00
rating: 5
summary: >-
  Before Hermione ever set foot in Hogwarts, she read every textbook on the
  syllabus, memorized the core spells, and packed her trunk with exactly the
  right supplies. She understood something that most first-years didn't: the
  magic isn't just in the wand  it's in the preparation.


  This guide is the Hermione approach to local development. Lovable conjures your application; GitHub stores the spell-book; Cloudflare Pages delivers it to the world. But if you want to actually *edit the incantations yourself* — run the project locally, tweak components, test changes before they go live — you need a properly equipped workstation. That means three tools: **Homebrew** (the apothecary), **Bun** (the wand), and **Git** (the owl post).
eleventyNavigation:
  parent: Blog
---
*A companion guide to [The Muggle-Proof Guide to Hosting Lovable on Cloudflare Pages](https://sage.education/posts/blog/en/2026-02-26-the-muggle-proof-guide-to-hosting-lovable-on-cloudflare-pages/).*

- - -

Before Hermione ever set foot in Hogwarts, she read every textbook on the syllabus, memorized the core spells, and packed her trunk with exactly the right supplies. She understood something that most first-years didn't: the magic isn't just in the wand  it's in the preparation.

This guide is the Hermione approach to local development. Lovable conjures your application; GitHub stores the spell-book; Cloudflare Pages delivers it to the world. But if you want to actually *edit the incantations yourself* — run the project locally, tweak components, test changes before they go live — you need a properly equipped workstation. That means three tools: **Homebrew** (the apothecary), **Bun** (the wand), and **Git** (the owl post).

Why bother with local tools when Lovable writes the code for you? Because there's a fundamental difference between asking an AI to do something and doing it yourself. When you type `bun run build`, the output is deterministic — same input, same output, every time, like casting Lumos in a dark corridor. When you ask Lovable to "make the header sticky," you might get exactly what you wanted, or you might get a creative reinterpretation that also refactors your nav component and deletes a config file it decided was unnecessary. AI agents — Lovable, Claude, all of them mimic conversational partners, not precision instruments. 

The tools below *are* precision instruments. 

Hermione would use both and she'd verify the AI's work with the wand.

- - -

## I. The Apothecary: Installing with Homebrew

![The apothecary — brewing your development environment from the finest ingredients. Art by David Revoy (CC BY 4.0).](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Pepper%26Carrot_cauldron.jpg/400px-Pepper%26Carrot_cauldron.jpg)

Homebrew is the wizarding apothecary of macOS: you tell it what you need, and it fetches, bottles, and shelves the ingredients for you. No hunting through websites for `.dmg` files. No dragging icons into folders like a Muggle.

### The Essential Ingredients

```bash
# If Homebrew itself isn't installed yet (the apothecary door is locked)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git — the owl post (version control)
brew install git

# Bun — the wand (package manager + runtime)
brew install oven-sh/bun/bun

# Node.js — the backup wand (some tools still expect it)
brew install node
```

**Why keep Node around?** Bun handles nearly everything, but certain Vite plugins, CL environments, and Lovable's own deploy pipeline still assume Node is present. Think of it as carrying a spare wand in your robe pocket — Ollivander wouldn't approve, but Moody would.

That's it. Three commands, three tools. The workstation is equipped. Notice what didn't happen: nobody had to *describe* what they wanted in natural language and hope for the best. `brew install bun` doesn't "interpret your intent." It installs Bun. Every time. This is the comfort of deterministic tooling — the spell does what the spell does.

- - -

## II. The Wand: Bun as Your Package Manager

![The Firebolt — same pitch, same rules, dramatically faster. Art by David Revoy (CC BY 4.0).](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pepper%26Carrot_broom_contest.jpg/400px-Pepper%26Carrot_broom_contest.jpg)

If Node's  NPM is the old Cleansweep Seven — reliable, gets the job done, takes its time — then Bun is a Firebolt. Same Quidditch pitch, same rules, dramatically faster.

### Why Bun?

| Operation                 | NPM    | Bun   | Speedup |
| ------------------------- | ------ | ----- | ------- |
| Install (cold cache)      | 20-60s | 2-5s  | ~10x    |
| Install (warm cache)      | 10-20s | <1s   | ~20x    |
| Script execution overhead | ~300ms | ~50ms | ~6x     |

The install speed is the headline. Bun resolves and writes `node_modules` in a fraction of the time, with roughly a sixth of the system calls. For a Lovable project with dozens of dependencies, this is the difference between waiting for the Hogwarts Express and Apparating directly to the platform.

### Does It Actually Work with Lovable Projects?

Yes. Lovable generates standard **Vite + React + TypeScript** projects. Bun reads the same `package.json`, resolves from the same npm registry, and produces a structurally identical `node_modules` directory. The commands map directly:

| npm               | Bun               |
| ----------------- | ----------------- |
| `npm install`     | `bun install`     |
| `npm run dev`     | `bun run dev`     |
| `npm run build`   | `bun run build`   |
| `npm add package` | `bun add package` |

`bun run dev` starts the Vite dev server with full hot module replacement (HMR). Edit a `.tsx` file and the browser updates in milliseconds — like a Remembrall that glows the instant something changes. There is no "I think you meant to update the other component." You changed line 42, the browser reflects line 42. 

This feedback loop is instantaneous and *literal*, which is what makes local development so much more precise than prompting an AI agent to make the same change for you.

### The Lockfile Question (Important)

This is where discipline matters — Hermione-level discipline.

Bun creates its **own** lockfile (`bun.lock` in Bun v1.2+, or the binary `bun.lockb` in older versions). It does **not** update npm's `package-lock.json`. This means after running `bun install`, you have two lockfiles in the project — two sources of truth, which is one too many.

**The rule: keep `package-lock.json` as the canonical lockfile.** Lovable, Cloudflare Pages, and any CI pipeline all expect it. Bun's lockfile stays local-only.

```bash
# Add to .gitignore — keep bun's lockfile out of the repo
echo "bun.lock" >> .gitignore
echo "bun.lockb" >> .gitignore
```

If you add a new dependency:

```bash
bun add some-package        # fast install, updates package.json
npm install                 # regenerate package-lock.json for the repo
git add package.json package-lock.json
git commit -m "add some-package"
```

Slightly tedious? Yes. But Hermione didn't get twelve O.W.L.s by cutting corners. The alternative, committing `bun.lock` alongside `package-lock.json` — confuses deploy platforms that auto-detect package managers and creates merge conflicts that are genuinely unpleasant to resolve.

- - -

## III. The Owl Post: Git Workflow with Lovable's Two-Way Sync

![The Owl Post — delivering your commits faithfully, rain or shine.](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Robert_Havell_after_John_James_Audubon%2C_Snowy_Owl%2C_1831%2C_NGA_32262.jpg/400px-Robert_Havell_after_John_James_Audubon%2C_Snowy_Owl%2C_1831%2C_NGA_32262.jpg)

Lovable's GitHub sync is the Protean Charm from \[[lovable-cloudflare-pages-hosting|the hosting guide]]: changes in Lovable auto-push to `main`, and commits on `main` auto-sync back to Lovable. This is wonderful for keeping everything in lockstep, and hazardous if you don't respect the protocol.

The danger is the same one Hermione faced with the Time-Turner: being in two places at once sounds powerful until you run into yourself coming the other way.

### The Golden Rules

**1. Never work directly on `main`!**

```bash
git checkout -b feature/my-changes
```

If you edit `main` locally while someone is editing simultaneously in Lovable's UI, both sides push to the same branch and you get ***merge conflicts***! Lovable-generated code is verbose and machine-structured. Resolving conflicts verbose code is like trying to decode a passage of Ancient Runes where every line looks almost identical.

Work on a branch. Merge to `main` when you're ready. This keeps your in-progress work invisible to Lovable until you choose to surface it. Use Git-Flow for precision when you want to be professional and work with others... we'll cover this another day.

**2. Always pull before you push.**

```bash
git checkout main
git pull origin main --rebase
git merge feature/my-changes
git push origin main
```

Lovable may have pushed new commits to `main` while you were working. Doing this `pull` before merging ensures your changes layer up cleanly on top. It's like arriving at the Great Hall after everyone's already seated, rather than crashing into the middle of the tables.

**3. One editor at a time on the `main` branch.**

If someone is actively prompting in Lovable, don't push to `main` from your terminal simultaneously. Take turns. Coordinate. Send an owl!

### What Happens When You Push to Main

The moment your commits land on `main`, two things happen in parallel:

* **Lovable** picks up the changes within seconds and syncs them into its editor
* **Cloudflare Pages** (if connected) triggers a new build and deploy

This is the complete flow: your local edit → Git → GitHub → Lovable + Cloudflare. Every link in the chain is automatic. You just have to push and pull to get your Lovable changes. Lovable → GitHub (→ Cloudflare) → Git → local edits. Cycle and repeat.

- - -

## IV. The Full Incantation: Clone to Running Dev Server

Here is the complete sequence, start to finish — the spell performed correctly, in order, with proper pronunciation.

```bash
# 1. Clone the repository (Accio source code)
git clone https://github.com/Nea-Xinyi/safe-trace-website.git
cd safe-trace-website

# 2. Create a working branch (never work on main directly)
git checkout -b local-dev

# 3. Install dependencies with Bun (the Firebolt install)
bun install

# 4. Set up environment variables (the Secret Keeper)
cp .env.example .env
# Fill in API keys, Supabase URL, etc.
# Remember: only VITE_* prefixed vars reach the client

# 5. Start the dev server (Lumos!)
bun run dev
# Vite starts on http://localhost:8080
# Full HMR — edit any .tsx file and see instant updates
```

### Building for Production Locally

```bash
# Build (produces dist/ directory)
bun run build

# Preview the production build before deploying
bun run preview
# Serves dist/ on a local port — verify everything works
```

### Optional Deploying Directly (Apparition, from the hosting guide)

```bash
# Build and deploy to Cloudflare Pages in one shot
bun run build && npx wrangler pages deploy dist --project-name=safe-trace-website
```

### Merging Your Work Back

```bash
git add .
git commit -m "feat: description of changes"
git checkout main
git pull origin main --rebase
git merge local-dev
git push origin main
# Lovable syncs within seconds. Cloudflare rebuilds automatically.
```

- - -

## V. The Monster Book of Gotchas

![The Monster Book of Monsters — handle with care.](https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png/400px-Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png)

Like Hagrid's textbook, these issues bite if you don't know how to handle them. Stroke the spine first.

| Gotcha                                            | What Happens                                                                                                                                                                                        | The Fix                                                                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Two lockfiles committed**                       | Deploy platforms auto-detect the wrong package manager; merge conflicts in CI                                                                                                                       | `.gitignore` the bun lockfile; keep `package-lock.json` as canonical                                                               |
| **Bun-specific APIs in code**                     | `Bun.serve()`, `Bun.file()`, `bun:test` — Lovable's AI won't understand them and may overwrite or break them on its next edit                                                                       | Stick to standard Node/Vite/React patterns in shared code                                                                          |
| **Tailwind v3 → v4 migration**                    | Lovable projects generated before mid-2025 use Tailwind v3 with `postcss.config.js`. If you upgrade to v4, the PostCSS plugin moves to `@tailwindcss/postcss` or the new `@tailwindcss/vite` plugin | Either stay on v3 (it works fine) or migrate carefully and update the Vite config                                                  |
| **Case-sensitive imports**                        | Your Mac doesn't care if it's `Button.tsx` or `button.tsx`. Linux (Cloudflare's build environment) does. This passes locally and fails in production                                                | Match import casing exactly — Snape does not grade on a curve                                                                      |
| **Editing in Lovable + locally at the same time** | Merge conflicts on `main` in machine-generated code that all looks the same                                                                                                                         | One editor at a time. Use branches locally. Coordinate.                                                                            |
| **Vite version jump**                             | Running `bun update vite` may pull a major version that Lovable's generated code isn't compatible with                                                                                              | Respect the version pins in `package.json`. Don't upgrade Vite without testing.                                                    |
| **HMR slowdown with `--bun` flag**                | Running `bunx --bun vite` (Vite under the Bun runtime) can cause slower hot reloads in certain configs                                                                                              | Drop the `--bun` flag. `bun run dev` already gives you fast installs while Vite uses Node for the dev server — best of both worlds |

- - -

## VI. Quick Reference Card

```bash
# Setup (one time)
brew install git node
brew install oven-sh/bun/bun

# Per project
git clone <repo> && cd <project>
git checkout -b local-dev
bun install
cp .env.example .env          # fill in secrets
echo "bun.lock" >> .gitignore

# Daily workflow
bun run dev                   # dev server with HMR
bun run build                 # production build → dist/
bun run preview               # preview production build

# Adding dependencies
bun add <package>             # fast install
npm install                   # regenerate package-lock.json
git add package.json package-lock.json

# Shipping
git pull origin main --rebase
git merge local-dev
git push origin main          # triggers Lovable sync + Cloudflare deploy
```

- - -

## References

* [Bun + Vite Guide (Bun Docs)](https://bun.com/docs/guides/ecosystem/vite)
* [Bun Installation (Bun Docs)](https://bun.com/docs/installation)
* [Bun Lockfile Documentation](https://bun.com/docs/pm/lockfile)
* [Vite Getting Started](https://vite.dev/guide/)
* [Lovable GitHub Integration](https://docs.lovable.dev/integrations/git-integration)
* [Lovable Best Practices](https://docs.lovable.dev/tips-tricks/best-practice)
* [Avoiding Merge Pitfalls with Lovable (Arsturn)](https://www.arsturn.com/blog/common-pitfalls-merging-lovable-projects-github)
* [Mac Setup for Web Dev 2025 (Robin Wieruch)](https://www.robinwieruch.de/mac-setup-web-development/)

## Illustrations

The artwork in this guide features illustrations from \[[pepper-and-carrot|Pepper & Carrot]], an open-source webcomic by **David Revoy** — a French digital artist who creates the entire series using free and open-source tools (Krita, Inkscape, Linux). All Pepper & Carrot art is released under **CC BY 4.0**, making it freely available for anyone to use, remix, and share with attribution.

The comic follows **Pepper**, a young witch-in-training, and her orange cat **Carrot** through a whimsical fantasy world of potion contests, broomstick races, and magical mishaps — which made it a perfect match for the Harry Potter metaphors in these guides.

* **Cauldron scene** (apothecary/Homebrew) — from Episode 1, *"The Potion of Flight."* CC BY 4.0, David Revoy. [Source.](https://commons.wikimedia.org/wiki/File:Pepper%26Carrot_cauldron.jpg)
* **Broom contest** (Firebolt/Bun speed) — CC BY 4.0, David Revoy. [Source.](https://commons.wikimedia.org/wiki/File:Pepper%26Carrot_broom_contest.jpg)
* **Snowy Owl** (Git/Owl Post) — *Robert Havell after John James Audubon, Snowy Owl* (1831). CC0 / Public Domain, National Gallery of Art. [Source.](https://commons.wikimedia.org/wiki/File:Robert_Havell_after_John_James_Audubon,_Snowy_Owl,_1831,_NGA_32262.jpg)
* **Fantasy book** (Monster Book of Gotchas) — *Quaternius 3D Card Kit, Fantasy Book.* CC0, Quaternius. [Source.](https://commons.wikimedia.org/wiki/File:Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png)

Read more: \[[pepper-and-carrot|Pepper & Carrot: The Open-Source Webcomic That Proves Free Art Works]]

- - -

Created: by Alexander Somma & Isabelle Plante with the research help of our Sage.Education AI 2026-02-26
