---
layout: layouts/blog.njk
title: The Muggle-Proof Guide to Hosting Lovable on Cloudflare Pages
tags: education
date: 2026-02-26T12:10:00.000-01:00
rating: 5
summary: >-
  You can think of Lovable as the Room of Requirement: you describe what you
  need, and a fully furnished Vite + React application materialises before your
  eyes. The trouble is that the Room of Requirement was never designed for
  public visitors. 


  To open the doors to the world, you need a hosting platform: Cloudflare Pages, with its global edge network, is the Floo Network of modern web deployment: instantaneous, distributed, and surprisingly difficult to mess up once you understand the fireplace.


  This guide walks through the entire pipeline, from Lovable's enchanted quill pushing code to GitHub, to Cloudflare Pages serving it worldwide, so that even a Muggle with a terminal could get it live.
eleventyNavigation:
  parent: Blog
---
*Prepared for the safe-trace-website deployment meeting with Amalia. See also: [Equipping the Wand: Local Development Setup](https://sage.education/posts/blog/en/2026-02-26-equipping-the-wand-local-development-for-a-lovable-project/) .*

- - -

![A fairy-tale castle perched above the clouds — your application, hosted for the world to see.](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Neuschwanstein_Castle_2024.jpg/400px-Neuschwanstein_Castle_2024.jpg)

You can think of Lovable as the Room of Requirement: you describe what you need, and a fully furnished Vite + React application materialises before your eyes. The trouble is that the Room of Requirement was never designed for public visitors. 

To open the doors to the world, you need a hosting platform: Cloudflare Pages, with its global edge network, is the Floo Network of modern web deployment: instantaneous, distributed, and surprisingly difficult to mess up once you understand the fireplace.

This guide walks through the entire pipeline, from Lovable's enchanted quill pushing code to GitHub, to Cloudflare Pages serving it worldwide, so that even a Muggle with a terminal could get it live.

Here's the thing about proper spells: they are *precise and deterministic*. Say "Lumos" and you get light. Every time. No ambiguity, no hallucination, no "I interpreted your request creatively." The commands in this guide — `npm run build`, `git push`, `npx wrangler pages deploy` — behave the same way. They are incantations with exact outcomes. Lovable, by contrast, is more like talking to a portrait on the wall: it understands you *mostly*, it's remarkably helpful, but it has its own interpretation of things, and occasionally it rearranges the furniture when you only asked it to open the window. That's the nature of AI — agents, LLMs, Lovable included. This guide is about the parts of the pipeline where magic is *reliable*.

- - -

## I. The Enchanted Quill: How Lovable Syncs to GitHub

Lovable's built-in GitHub integration is a **two-way sync** (a Protean Charm, of sorts). Every time you save in the Lovable editor, the changes are automatically pushed to your repo's `main` branch. Edit the code directly on GitHub or from a local IDE, and Lovable picks those changes back up, like Hermione's enchanted coins updating in real time across the DA.

What lands in the repo is a standard **Vite + React + TypeScript** project:

```
src/               # application source code
public/            # static assets
package.json       # dependencies & scripts
vite.config.ts     # build configuration
tsconfig.json      # TypeScript config
tailwind.config.ts # Tailwind CSS config
.env.example       # environment variable template
```

> **Note:** Sync has a short delay. If it seems stuck, making a trivial edit (adding a comment, say) will nudge the quill into action.

- - -

## II. The Sorting Hat: Cloudflare Pages Build Settings

![The Sorting Hat ceremony — get the configuration right and everything flows to the correct house.](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Creative-Tail-Halloween-witch-hat.svg/400px-Creative-Tail-Halloween-witch-hat.svg.png)

When Cloudflare Pages receives your code, it needs to know how to build it. Think of this as the Sorting Hat ceremony — except unlike Lovable's AI, the Sorting Hat doesn't improvise. It doesn't decide your React app would look better in Svelte. You give it four exact values, and it performs the same build, on every push, forever. That predictability is the point. Get the configuration right and everything flows to the correct house. Get it wrong and you're stuck in limbo with a blank screen.

| Setting                    | Value           |
| -------------------------- | --------------- |
| **Framework preset**       | None (or Vite)  |
| **Build command**          | `npm run build` |
| **Build output directory** | `dist`          |
| **Root directory**         | `/` (default)   |

### Environment Variables

Set these in the Pages dashboard under **Settings > Environment Variables**:

| Variable       | Value                              | Why                                                                                                                                                              |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_VERSION` | `20` (or match your local version) | Pages v3 defaults to Node 22.16.0, v2 to 18.17.1 — Lovable projects typically target 18-20                                                                       |
| `VITE_*`       | any app-specific env vars          | Vite operates like the Fidelius Charm for env vars — only those prefixed with `VITE_` are exposed to the client. Everything else stays secret-kept on the server |

> **Tip:** You can also place a `.nvmrc` file in the repo root containing just `20` to pin the Node version — a spell Hermione would definitely appreciate for its tidiness.

- - -

## III. The Step-by-Step Ritual

### 1. Connecting the Floo Network (GitHub to Cloudflare)

![The Floo Network — an old fireplace, a pinch of powder, and you're anywhere in the world.](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Charles_Frederic_Ulrich_-_An_old_fire-place_%281882%29.jpg/400px-Charles_Frederic_Ulrich_-_An_old_fire-place_%281882%29.jpg)

1. Cloudflare dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
2. Authorize Cloudflare's GitHub App
3. Select the `safe-trace-website` repository
4. Enter the build settings from the Sorting Hat table above
5. Deploy

That's it. The Floo connection is established.

### 2. Continuous Deployment (The Marauder's Map, Always Watching)

![The Marauder's Map — always watching, always tracking every movement.](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Treasure_map.svg/400px-Treasure_map.svg.png)

Once connected, **every push from Lovable to GitHub automatically triggers a Cloudflare Pages build**. No manual intervention required. This includes:

* **Production deploys** from `main`
* **Preview deploys** from other branches — like testing a spell in a practice room before performing it in the Great Hall

Lovable saves > GitHub receives the push > Cloudflare builds and deploys. The whole chain fires automatically, like a line of dominoes charmed to fall in sequence. Every step is deterministic. Git doesn't "decide" whether to push. Cloudflare doesn't "feel like" building today. The pipeline does exactly what it was told, every single time — which is precisely why it's trustworthy in ways that an LLM-powered tool cannot be on its own.

### 3. Custom Domain (Claiming Your Address on the Map)

**For an apex domain** (e.g. `safetrace.com`):

1. The domain must be added as a Cloudflare zone — nameservers pointed to Cloudflare's, like registering your fireplace with the Ministry
2. Pages dashboard > Custom domains > Set up a domain
3. Cloudflare auto-creates the CNAME record

**For a subdomain** (e.g. `app.safetrace.com`):

1. Does NOT need to be a Cloudflare zone
2. Add a CNAME record: `app` > `safe-trace-website.pages.dev`
3. **Critical:** You must ALSO register it through the Pages dashboard first, or you'll trigger a 522 error — the web equivalent of running into the wall between Platforms 9 and 10 because you forgot to believe

**SSL:** Cloudflare auto-provisions certificates within 5-15 minutes. If you have CAA DNS records, ensure Cloudflare is listed as an allowed Certificate Authority.

![SSL — your site's coat of arms, sealed and certified.](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Coat_of_Arms_of_the_Worshipful_Company_of_Security_Professionals.svg/400px-Coat_of_Arms_of_the_Worshipful_Company_of_Security_Professionals.svg.png)

### 4. SPA Routing (The Vanishing Cabinet Fix)

Single-page apps using client-side routing (React Router) have a quirk: if someone navigates directly to `/about`, Cloudflare looks for an `about.html` file, finds nothing, and returns a 404. The page vanishes.

The fix is a `public/_redirects` file in your repo:

```
/*    /index.html   200
```

This tells Cloudflare: "No matter what path they request, serve `index.html` and let React Router handle the rest." Like repairing the Vanishing Cabinet — both ends of the connection now work properly.

- - -

## IV. Will This Break the Lovable Sync? (No.)

This was the lingering concern: if Cloudflare Pages is connected to the same GitHub repo that Lovable syncs to, will the two systems interfere with each other — like two wizards casting conflicting spells on the same object?

**The short answer is no.** Here's why:

* **Cloudflare Pages is strictly read-only.** It reads your repo to build. It never writes a single commit, file, or branch. It's a spectator in the stands at a Quidditch match, not a player on the pitch.
* **`npx wrangler pages deploy dist` bypasses GitHub entirely.** It uploads built assets directly to Cloudflare's edge. It doesn't know or care that GitHub exists.
* **Multiple GitHub Apps coexist peacefully.** Lovable's App and Cloudflare's App each receive their own independent webhook deliveries. They don't cross streams. Lovable's own docs explicitly endorse deploying to Cloudflare Pages.

### The Two Real Risks (and How Hermione Would Handle Them)

| Risk                                               | Severity | The Hermione Approach                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lovable's AI modifying Cloudflare config files** | Low      | If you add `_redirects`, `wrangler.toml`, or `_headers` to the repo, Lovable's AI *could* modify or delete them during a prompt — it doesn't know they're important. This is the classic AI problem: an LLM optimises for what it *thinks* you want, not what you *actually* need left alone. A `git push` would never delete your `_redirects` file on a whim. Lovable might. Tell it explicitly: "Do not touch `_redirects` or `_headers`." Hermione would write it on a label and stick it to the file. |
| **Merge conflicts from simultaneous editing**      | Medium   | If someone is editing in Lovable while another person pushes commits from a local IDE at the same time, you can get merge conflicts. Lovable-generated code is verbose and machine-structured — untangling conflicts in it is like deciphering a tome written in Ancient Runes. **The rule:** don't edit in two places at once. Take turns. Hermione used a Time-Turner to be in two places at once, and even she found it unsustainable.                                                                  |

- - -

## V. The Direct Deploy: npx + Wrangler (Apparition)

Sometimes you don't want to wait for the Floo Network. You want to Apparate — build locally, deploy instantly, arrive at the destination in seconds. This is the purest form of deterministic deployment: you built it, you verified it, you're pushing exactly those bytes to the edge. No AI in the loop. No "let me regenerate that for you." Just `dist/` and a command.

```bash
# Clone and build
git clone https://github.com/Nea-Xinyi/safe-trace-website.git
cd safe-trace-website
npm ci && npm run build

# Apparate directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=safe-trace-website
```

On first run, `npx wrangler` will prompt for Cloudflare authentication. After that, deployment is a single command.

### Useful Flags

| Flag                    | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `--project-name=<name>` | Target a specific Pages project (creates it if it doesn't exist) |
| `--branch=main`         | Tag as a production deploy                                       |
| `--branch=preview`      | Tag as a preview deploy                                          |
| `--commit-hash=<sha>`   | Attach a git commit reference for traceability                   |

### Force a Rebuild (Without Building Locally)

If the project is already connected to GitHub and you just need to retrigger the CI pipeline:

```bash
# The Reparo spell — push an empty commit to retrigger
git commit --allow-empty -m "trigger rebuild" && git push
```

Or from the **Cloudflare dashboard** > Deployments > **Retry deployment** on the latest build.

- - -

## VI. The Troubleshooting Compendium

![The Monster Book of Monsters — handle with care.](https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png/400px-Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png)

Like the Monster Book of Monsters, these issues bite — but they're manageable once you know how to stroke the spine.

| Issue                                 | Cause                                           | Fix                                                                                                                        |
| ------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Build fails with ERESOLVE**         | Peer dependency conflicts                       | Set `SKIP_DEPENDENCY_INSTALL=true` and use `npm install --legacy-peer-deps && npm run build` as the build command          |
| **Build fails silently**              | Node version too old                            | Set `NODE_VERSION=20` in env vars or add `.nvmrc`                                                                          |
| **Module not found**                  | Case-sensitive file paths on Linux              | Fix import casing — macOS is case-insensitive like a forgiving professor, Cloudflare's Ubuntu is case-sensitive like Snape |
| **404 on page refresh**               | Missing SPA redirect                            | Add `public/_redirects` file (see Section IV)                                                                              |
| **Custom domain 522 error**           | CNAME added without using Pages dashboard first | Register the domain through Pages dashboard, then configure DNS                                                            |
| **Env vars not accessible in client** | Missing `VITE_` prefix                          | Vite only exposes `VITE_*` vars — the Fidelius Charm at work                                                               |
| **20-minute build timeout**           | Too many dependencies                           | Move linting and type-checking to GitHub Actions; trim the dependency tree                                                 |

- - -

## VII. Pre-Meeting Checklist

* Clone `safe-trace-website` locally
* Run `npm ci && npm run build` — verify it produces a clean `dist/` folder
* Check `vite.config.ts` for a `base` property (should be `/` for Pages, not a subpath)
* Identify any `.env` vars the app requires — these will need to be set as `VITE_*` in the Pages dashboard
* Test `npx wrangler pages deploy dist --project-name=safe-trace-website` for a direct deploy

- - -

## References

* [Cloudflare Pages Build Configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
* [Cloudflare Pages Build Image](https://developers.cloudflare.com/pages/configuration/build-image/)
* [Cloudflare Pages Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
* [Cloudflare Pages Known Issues](https://developers.cloudflare.com/pages/platform/known-issues/)
* [Cloudflare Pages GitHub Integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
* [Lovable Git Integration Docs](https://docs.lovable.dev/integrations/git-integration)
* [Deploy Lovable to Cloudflare (Vibe Coding With Fred)](https://vibecodingwithfred.com/blog/lovable-to-cloudflare/)
* [Cloudflare Pages Build Failures Guide](https://eastondev.com/blog/en/posts/dev/20251201-cloudflare-pages-build-failures-guide/)

## Illustrations

The artwork in this guide is sourced from Wikimedia Commons under free licenses. The fantasy-themed illustrations were chosen to match the Harry Potter metaphors woven throughout.

* **Castle** (hero image) — *Neuschwanstein Castle, 2024.* CC0 / Public Domain. [Source.](https://commons.wikimedia.org/wiki/File:Neuschwanstein_Castle_2024.jpg)
* **Witch hat** (build config) — *Creative Tail Halloween Witch Hat.* CC BY 4.0, Creative Tail. [Source.](https://commons.wikimedia.org/wiki/File:Creative-Tail-Halloween-witch-hat.svg)
* **Fireplace** (Floo Network) — *An Old Fire-Place* (1882) by Charles Frederic Ulrich. Public Domain. [Source.](https://commons.wikimedia.org/wiki/File:Charles_Frederic_Ulrich_-_An_old_fire-place_(1882).jpg)
* **Treasure map** (Marauder's Map) — CC0 / Public Domain, hextrust. [Source.](https://commons.wikimedia.org/wiki/File:Treasure_map.svg)
* **Coat of arms** (SSL) — *Coat of Arms of the Worshipful Company of Security Professionals.* CC BY-SA 4.0. [Source.](https://commons.wikimedia.org/wiki/File:Coat_of_Arms_of_the_Worshipful_Company_of_Security_Professionals.svg)
* **Fantasy book** (troubleshooting) — *Quaternius 3D Card Kit, Fantasy Book.* CC0, Quaternius. [Source.](https://commons.wikimedia.org/wiki/File:Quaternius_-_3D_Card_Kit_-_Fantasy_-_27_Book.png)

- - -

Created: by Alexander Somma & Isabelle Plante with the research help of our Sage.Education AI 2026-02-26
