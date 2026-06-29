---
title: How to Build an AI — Sage.Education
description: Start here. A friendly, no-experience-needed warm-up that takes you from "what is code?" to running your very first AI notebook, at your own pace.
layout: about
permalink: /how-to-build-an-ai/
eleventyExcludeFromCollections: true
robots: "noindex, nofollow"
---

<style>
@scope {
  /* List markers sit beside the first line, even when an item wraps or holds a block
     (the site sets list-style-position:inside globally, which floats markers onto their
     own line in loose lists — e.g. the ordered steps with a code block). */
  ol, ul { list-style-position: outside; padding-left: 1.5rem; }
  /* Self-check: real checkboxes, no bullets, box aligned to the first line of its label. */
  .checklist { list-style: none; padding-left: 0; }
  .checklist li { display: flex; align-items: flex-start; gap: 0.55rem; margin: 0.4rem 0; }
  .checklist input[type="checkbox"] { flex: none; margin-top: 0.3em; width: 1.05em; height: 1.05em; }
  /* This page uses real checkboxes, so hide the global .checklist checkmark-icon ::before. */
  .checklist li::before { background: none; }
  /* Premiere video: a 16:9 responsive iframe inside a gradient frame (startr.style has no aspect token).
     Also covers the "coming soon" placeholder card (inline svg) that stands in before the embed exists. */
  .premiere-frame iframe, .premiere-frame svg, .premiere-frame img { width: 100%; height: 100%; aspect-ratio: 16 / 9; display: block; border: 0; border-radius: 11px; }
}
</style>

Hi, and welcome. If you're curious how an AI actually gets built, and whether *you* could build one, this is a good place to start. This is a short, friendly warm-up you can do at your own pace. You don't need any coding experience, and you don't need to finish all of it. Think of it as a gentle on-ramp, not a test.

<!-- WEEK 2 PREMIERE — "coming soon" placeholder card. No premiere link yet; the film airs 8 PM ET.
     SWAP when the YouTube link arrives:
       1. Archive the whole <div class="premiere-frame"> … </div> card below by wrapping it in a
          Nunjucks comment {# … #} (11ty strips it from the build but it stays in this source file).
          KEEP it — we reuse this card for each week's premiere; just bump "WEEK 2 · PREMIERE" and the
          airtime for the next one.
       2. Drop the iframe embed in its place (copy the Week 1 frame lower on this page, change the id).
     The .premiere-frame styles already cover both the svg card and the iframe. -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Week 2 premiere — premieres tonight at 8 PM ET, coming soon">
    <defs>
      <linearGradient id="p2bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2563EB"/>
        <stop offset="0.55" stop-color="#3b2fe8"/>
        <stop offset="1" stop-color="#5522FA"/>
      </linearGradient>
      <radialGradient id="p2glow" cx="0.5" cy="0.36" r="0.55">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.20"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#p2bg)"/>
    <rect width="1600" height="900" fill="url(#p2glow)"/>
    <circle cx="1330" cy="180" r="240" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
    <circle cx="250" cy="780" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
    <text x="800" y="330" text-anchor="middle" font-family="Poppins, sans-serif" font-size="30" font-weight="600" letter-spacing="6" fill="#ffffff" fill-opacity="0.85">WEEK 2 · PREMIERE</text>
    <text x="800" y="472" text-anchor="middle" font-family="Poppins, sans-serif" font-size="96" font-weight="700" fill="#ffffff">Premieres tonight</text>
    <text x="800" y="558" text-anchor="middle" font-family="Poppins, sans-serif" font-size="48" font-weight="400" fill="#ffffff" fill-opacity="0.92">8 PM ET</text>
    <rect x="650" y="606" width="300" height="58" rx="29" fill="#ffffff" fill-opacity="0.14"/>
    <text x="800" y="644" text-anchor="middle" font-family="Poppins, sans-serif" font-size="24" font-weight="600" letter-spacing="3" fill="#ffffff" fill-opacity="0.9">COMING SOON</text>
    <text x="800" y="824" text-anchor="middle" font-family="Poppins, sans-serif" font-size="26" font-weight="600" letter-spacing="1" fill="#ffffff" fill-opacity="0.85">Sage.Education<tspan font-size="14" dy="-10">™</tspan></text>
  </svg>
</div>

Our next short film premieres **tonight at 8 PM ET**, right here. It's about the one idea that turns a general AI into *yours*: how you tell it to behave.

## Tell an AI how to behave

One of the first things that makes an AI genuinely useful is giving it its instructions. You tell an assistant who it is and how you want it to behave, and the rule we care about most is **coach me, don't do it for me.** A good assistant doesn't hand you a finished plan; it helps you make your own.

You can try this yourself right now. Open our little notebook and run it top to bottom. It downloads a small open AI onto your own computer (or runs in Colab, your choice; no account or key needed beyond the one-time download) and lets you chat with it. Change its instructions, the **system prompt**, and watch how differently it answers.

[▶ Open the notebook in Colab](https://colab.research.google.com/drive/1gI_dkRjHms5bVNMZ_1AobQQc5X2HpoIE?usp=sharing)

---

<!-- PREMIERE (live 2026-06-22). Real YouTube embed in an on-brand gradient frame.
     The original "premiering today" placeholder SVG lives in git history if ever needed.
     To change the film, swap the embed id (6wkKpRsQfiU) below. -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/6wkKpRsQfiU"
    title="How to Build an AI — premiere" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

▶ Press play for our short film on building your own AI. Stick around to the end, that's where the code starts talking back.

<details style="--maxw:820px; --m:-0.5rem auto 1.5rem; --c:#5522FA;">
  <summary style="--cur:pointer; --weight:600;">psst — want to make <em>your</em> computer talk back?</summary>

Open a fresh [Colab notebook](https://colab.research.google.com) and run these six lines. It'll greet you, out loud:

```python
!pip -q install gTTS
from gtts import gTTS
from IPython.display import Audio
name = input("What's your name? ")
gTTS(f"Hello {name}, welcome to the Sage team!").save("hi.mp3")
Audio("hi.mp3", autoplay=True)
```

</details>

---

## First, one time-sensitive thing: your account access

Early on, you'll write and run code right inside your web browser, using a free tool from Google called **Google Colab** (more on what that is below). The easy way in is to sign in with a **Google account**, the same kind you use for Gmail or Google Drive.

**If you don't have a Google account, or you can't use one** (maybe your school blocks it, your family prefers not to, or it isn't available where you are), that's completely fine. You can run the very same notebooks another way: with a Jupyter Notebook on your own computer, or one hosted for you on a cluster (a group of computers you reach over the internet). Nobody gets stuck. There's always a path that works for you.

---

## Words you'll hear (and what they actually mean)

Don't worry about memorizing these. Skim them now; they'll click once you see them in action.

- **Python.** A programming language. It's one of the friendliest to learn because it reads a lot like plain English, and it's the main one we'll use.
- **Code, or a script.** Instructions you write for the computer to follow. A script is just a short file of those instructions, run top to bottom.
- **Jupyter Notebook.** A document where you write small chunks of code and run them one at a time, with the result showing right underneath each chunk. Think of it as a lab notebook for code: try a little, see what happens, try a little more. It's the friendliest way to learn, which is why we start there.
- **Google Colab** (short for "Colaboratory"). A free Jupyter Notebook that runs in your web browser, hosted by Google. Nothing to install; you just need a Google account and internet.
- **A cell.** One chunk of code (or notes) inside a notebook that you can run on its own.
- **To "run" something.** To tell the computer to actually carry out the code. In a notebook you press the little ▶ play button, or hold **Shift** and press **Enter**.
- **A cluster.** A group of powerful computers you can use over the internet. Handy when a job is too big for a laptop, or when you'd rather not rely on Google.
- **The terminal** (or "command line"). A plain text window where you type commands instead of clicking buttons. It looks intimidating and isn't. You do not need this to start; you'll pick it up later, from scratch.
- **git.** A tool that saves the history of a project and lets a team work on the same code without overwriting each other. Like "track changes" plus save points, for code. Also something you'll pick up later, not needed yet.
- **AI model** (you may hear "LLM," short for *large language model*). The kind of AI you'll learn to build and shape yourself. Learning how these actually work is the whole point.

---

## Your warm-up, step by step

### Step 1 — Meet Python (a couple of hours, whenever you like)

Pick whichever you enjoy more:

- **Python for Everybody** (free), at [py4e.com](https://www.py4e.com). The gentlest good intro out there. Watch or read the first few chapters.
- The **official Python tutorial** at [docs.python.org/3/tutorial](https://docs.python.org/3/tutorial/), sections 1 through 5.

You're not trying to master anything. You're just getting a feel for what code looks like and what it can do.

### Step 2 — Open your very first notebook (about 15 minutes)

This is the one hands-on thing worth trying before you go further:

1. Go to **[colab.research.google.com](https://colab.research.google.com)** and sign in with your Google account. *(Can't use Google? Skip this and use a Jupyter Notebook on your own computer instead. Same idea, same result.)*
2. Click **New notebook**.
3. In the first empty cell, type exactly this:

   ```python
   print("Hello, Sage.Education")
   ```

4. Press the ▶ button to the left of the cell (or hold **Shift** and press **Enter**). You should see "Hello, Sage.Education" appear just below.

That's it. You just wrote and ran code. Genuinely, that's the skill, and everything else builds from there.

### Step 3 — (Optional stretch) Change something and run it again

Open our tiny "Startr" notebook here: [Startr notebook](https://colab.research.google.com/drive/1B0fn69htLTIJW226HyLGW9dncCHyT095?usp=sharing). Try changing a word or a number in a cell, then run it again and see what changes. Being able to read a short piece of code and change small parts of it is exactly the level that lets you start building. If this feels like a lot, leave it. You'll get there.

### Step 4 — Make one of your own, and say hello

Now the fun part: start a fresh notebook and make it say hello to the rest of the team. One line is plenty (`print("Hi, I'm Alex!")`), or get as creative as you like. This is your first real thing, made by you.

When you're happy with it, share it with us: in Colab, click **Share** (top right), set it to anyone with the link, and send us that link. We love seeing these.

Want yours shown here as an example for the next person starting out? Just tell us. As long as your consent and release form are sorted, we may feature a few standout first notebooks on this page to help others find their footing.

---

## Where this gets you

A quick self-check (no pressure):

<ul class="checklist">
  <li><input type="checkbox"> I've spent a little time getting a feel for Python (Step 1).</li>
  <li><input type="checkbox"> I've opened a notebook and run one line of code.</li>
  <li><input type="checkbox"> I can read a short piece of code and change small parts of it.</li>
  <li><input type="checkbox"> I've made my own notebook that says hello, and shared it with the team.</li>
  <li><input type="checkbox"> I know I can ask for help anytime, about anything.</li>
</ul>

Tick those and you're ready to build your own AI.

---

## Stuck on anything? That's normal, just ask

No question is too small or too basic. If a word didn't make sense, a button wasn't where we said, or you're not sure whether you can use Google, reach out through our [support page](/support/) and we'll help. We'd much rather hear from you early than have you worry on your own.

See you soon.

— The Sage.Education™ team
