---
title: How to Build an AI — Sage.Education
description: Start here. A friendly, no-experience-needed warm-up that takes you from "what is code?" to running your very first AI notebook, at your own pace.
layout: about
permalink: /how-to-build-an-ai/
eleventyExcludeFromCollections: true
robots: "noindex, nofollow"
---

Hi, and welcome. If you're curious how an AI actually gets built, and whether *you* could
build one, this is a good place to start.

This is a short, friendly warm-up you can do at your own pace. You don't need any coding
experience, and you don't need to finish all of it. Think of it as a gentle on-ramp, not a
test.

<!-- PREMIERE PLACEHOLDER (set 2026-06-22). When the premiere leg is ready, replace the
     frame <div> below (the whole div, SVG included) with this — startr.style inline props
     only, no new CSS:
       <div style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14;">
         <iframe width="1280" height="720" style="--w:100%; --br:14px; --d:block;"
           src="https://www.youtube.com/embed/VIDEO_ID"
           title="How to Build an AI — premiere" loading="lazy"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen></iframe>
       </div>
     NOTE: startr.style has no aspect-ratio token. The 1280×720 width/height attributes
     give the iframe a 16:9 intrinsic ratio that --w:100% scales down cleanly in modern
     browsers. (Upstream-fix candidate: add an --ar token to startr.style.) -->
<div style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14;">
  <svg viewBox="0 0 1600 900" style="--w:100%; --d:block;" role="img"
       aria-labelledby="premiere-title premiere-desc"
       xmlns="http://www.w3.org/2000/svg">
    <title id="premiere-title">Premiering today at 8:00 PM Eastern</title>
    <desc id="premiere-desc">A short film on building your own AI, premiering today at 8 PM ET.</desc>
    <defs>
      <linearGradient id="premiereBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2563EB"/>
        <stop offset="0.55" stop-color="#3b2fe8"/>
        <stop offset="1" stop-color="#5522FA"/>
      </linearGradient>
      <radialGradient id="premiereGlow" cx="0.5" cy="0.36" r="0.5">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#premiereBg)"/>
    <rect width="1600" height="900" fill="url(#premiereGlow)"/>

    <!-- soft decorative orbits for depth -->
    <circle cx="1330" cy="190" r="240" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
    <circle cx="250" cy="780" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="1410" cy="760" r="8" fill="#ffffff" fill-opacity="0.5"/>
    <circle cx="190" cy="180" r="6" fill="#ffffff" fill-opacity="0.4"/>

    <!-- play button -->
    <circle cx="800" cy="320" r="86" fill="#ffffff" fill-opacity="0.16"/>
    <circle cx="800" cy="320" r="62" fill="#ffffff"/>
    <path d="M782 290 L824 320 L782 350 Z" fill="#5522FA"/>

    <!-- premiere pill -->
    <rect x="650" y="448" width="300" height="50" rx="25" fill="#ffffff" fill-opacity="0.16"/>
    <text x="800" y="481" text-anchor="middle" font-family="Poppins, sans-serif"
          font-size="24" font-weight="600" letter-spacing="3" fill="#ffffff">PREMIERE</text>

    <text x="800" y="600" text-anchor="middle" font-family="Poppins, sans-serif"
          font-size="92" font-weight="700" fill="#ffffff">Premiering today</text>
    <text x="800" y="678" text-anchor="middle" font-family="Poppins, sans-serif"
          font-size="46" font-weight="600" fill="#ffffff" fill-opacity="0.95">8:00 PM Eastern (ET)</text>
    <text x="800" y="742" text-anchor="middle" font-family="Poppins, sans-serif"
          font-size="32" font-weight="400" fill="#ffffff" fill-opacity="0.85">A short film on building your own AI</text>

    <text x="800" y="852" text-anchor="middle" font-family="Poppins, sans-serif"
          font-size="26" font-weight="600" letter-spacing="1" fill="#ffffff" fill-opacity="0.8">Sage.Education</text>
  </svg>
</div>

We're premiering a short film on this page **today at 8:00 PM Eastern**. Watch it live if
you can, or come back any time after. It stays up.

---

## First, one time-sensitive thing: your account access

Early on, you'll write and run code right inside your web browser, using a free tool from
Google called **Google Colab** (more on what that is below). The easy way in is to sign in
with a **Google account**, the same kind you use for Gmail or Google Drive.

**If you don't have a Google account, or you can't use one** (maybe your school blocks it,
your family prefers not to, or it isn't available where you are), that's completely fine.
You can run the very same notebooks another way: with a Jupyter Notebook on your own
computer, or one hosted for you on a cluster (a group of computers you reach over the
internet). Nobody gets stuck. There's always a path that works for you.

---

## Words you'll hear (and what they actually mean)

Don't worry about memorizing these. Skim them now; they'll click once you see them in action.

- **Python.** A programming language. It's one of the friendliest to learn because it reads
  a lot like plain English, and it's the main one we'll use.
- **Code, or a script.** Instructions you write for the computer to follow. A script is
  just a short file of those instructions, run top to bottom.
- **Jupyter Notebook.** A document where you write small chunks of code and run them one at
  a time, with the result showing right underneath each chunk. Think of it as a lab
  notebook for code: try a little, see what happens, try a little more. It's the friendliest
  way to learn, which is why we start there.
- **Google Colab** (short for "Colaboratory"). A free Jupyter Notebook that runs in your
  web browser, hosted by Google. Nothing to install; you just need a Google account and
  internet.
- **A cell.** One chunk of code (or notes) inside a notebook that you can run on its own.
- **To "run" something.** To tell the computer to actually carry out the code. In a notebook
  you press the little ▶ play button, or hold **Shift** and press **Enter**.
- **A cluster.** A group of powerful computers you can use over the internet. Handy when a
  job is too big for a laptop, or when you'd rather not rely on Google.
- **The terminal** (or "command line"). A plain text window where you type commands instead
  of clicking buttons. It looks intimidating and isn't. You do not need this to start;
  you'll pick it up later, from scratch.
- **git.** A tool that saves the history of a project and lets a team work on the same code
  without overwriting each other. Like "track changes" plus save points, for code. Also
  something you'll pick up later, not needed yet.
- **AI model** (you may hear "LLM," short for *large language model*). The kind of AI you'll
  learn to build and shape yourself. Learning how these actually work is the whole point.

---

## Your warm-up, step by step

### Step 1 — Meet Python (a couple of hours, whenever you like)

Pick whichever you enjoy more:

- **Python for Everybody** (free), at [py4e.com](https://www.py4e.com). The gentlest good
  intro out there. Watch or read the first few chapters.
- The **official Python tutorial** at [docs.python.org/3/tutorial](https://docs.python.org/3/tutorial/),
  sections 1 through 5.

You're not trying to master anything. You're just getting a feel for what code looks like
and what it can do.

### Step 2 — Open your very first notebook (about 15 minutes)

This is the one hands-on thing worth trying before you go further:

1. Go to **[colab.research.google.com](https://colab.research.google.com)** and sign in
   with your Google account. *(Can't use Google? Skip this and use a Jupyter Notebook on
   your own computer instead. Same idea, same result.)*
2. Click **New notebook**.
3. In the first empty cell, type exactly this:

   ```python
   print("Hello, Sage")
   ```

4. Press the ▶ button to the left of the cell (or hold **Shift** and press **Enter**). You
   should see `Hello, Sage` appear just below.

That's it. You just wrote and ran code. Genuinely, that's the skill, and everything else
builds from there.

### Step 3 — (Optional stretch) Change something and run it again

Open our tiny `Startr` notebook here:
[Startr notebook](https://colab.research.google.com/drive/1B0fn69htLTIJW226HyLGW9dncCHyT095?usp=sharing).
Try changing a word or a number in a cell, then run it again and see what changes. Being
able to read a short piece of code and change small parts of it is exactly the level that
lets you start building. If this feels like a lot, leave it. You'll get there.

---

## Where this gets you

A quick self-check (no pressure):

- [ ] I've spent a little time getting a feel for Python (Step 1).
- [ ] I've opened a notebook and run one line of code.
- [ ] I can read a short piece of code and change small parts of it.
- [ ] I know I can ask for help anytime, about anything.

Tick those and you're ready to build your own AI.

---

## Stuck on anything? That's normal, just ask

No question is too small or too basic. If a word didn't make sense, a button wasn't where
we said, or you're not sure whether you can use Google, reach out through our
[support page](/support/) and we'll help. We'd much rather hear from you early than have
you worry on your own.

See you soon.

— The Sage.Education™ team
