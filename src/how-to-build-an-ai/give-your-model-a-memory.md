---
title: Give your model a memory
description: Give your planning model a small knowledge base to look things up in, cite its source, and flag a note that doesn't fit.
order: 5
expanded: 2026-07-09
---
Welcome back. Last week you trained your own model. This week you give it something to remember.

<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Premiere coming soon, Monday 8 PM ET">
    <defs>
      <linearGradient id="p4bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2563EB"/>
        <stop offset="0.55" stop-color="#3b2fe8"/>
        <stop offset="1" stop-color="#5522FA"/>
      </linearGradient>
      <radialGradient id="p4glow" cx="0.5" cy="0.36" r="0.55">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.20"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#p4bg)"/>
    <rect width="1600" height="900" fill="url(#p4glow)"/>
    <circle cx="1330" cy="180" r="240" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
    <circle cx="250" cy="780" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
    <text x="800" y="330" text-anchor="middle" font-family="Poppins, sans-serif" font-size="30" font-weight="600" letter-spacing="6" fill="#ffffff" fill-opacity="0.85">WEEK 4 · PREMIERE</text>
    <text x="800" y="472" text-anchor="middle" font-family="Poppins, sans-serif" font-size="96" font-weight="700" fill="#ffffff">Premieres Monday</text>
    <text x="800" y="558" text-anchor="middle" font-family="Poppins, sans-serif" font-size="48" font-weight="400" fill="#ffffff" fill-opacity="0.92">8 PM ET</text>
    <rect x="650" y="606" width="300" height="58" rx="29" fill="#ffffff" fill-opacity="0.14"/>
    <text x="800" y="644" text-anchor="middle" font-family="Poppins, sans-serif" font-size="24" font-weight="600" letter-spacing="3" fill="#ffffff" fill-opacity="0.9">COMING SOON</text>
    <text x="800" y="824" text-anchor="middle" font-family="Poppins, sans-serif" font-size="26" font-weight="600" letter-spacing="1" fill="#ffffff" fill-opacity="0.85">Sage.Education<tspan font-size="14" dy="-10">™</tspan></text>
  </svg>
</div>

Stick around to the end — that's where your model starts showing its sources.

## Smart but forgetful

Your trained model is clever, but on its own it's working from memory. When it doesn't know something, it doesn't say "I don't know." It makes a confident guess. That's where wrong advice comes from.

The fix is giving it real notes to lean on. A small set of notes your model can look things up in is called a **knowledge base**, and it's simpler than it sounds: you write short notes, each with a source, and the model searches them before it answers. Think of it like handing a new team member a binder of planning notes and saying, "Check here first before you answer a question."

The best part: the answer comes with a citation. It tells you which note it used, so you can check it yourself. It turns "trust me" into "here's where I got that." For a planning assistant, that's the difference between a hunch and real help.

## The "out of place" meter

There's one more tool this week, and it has a name that sounds intimidating and isn't: **perplexity**. Think of it as a meter that goes up when a note looks out of place — like a sentence that doesn't fit with the rest.

If a bad note sneaks into your knowledge base, the meter flags it so a human can take a look before the model ever quotes it. It won't catch everything (that's next week's whole topic), but it catches the odd stuff for free. That human, this week, is you.

## Try it now

You can try this yourself right now. The notebook runs in about 10 to 15 minutes, and the questions answer instantly. Nothing to install, and you can't really break it.

[▶ Open the Week 4 notebook in Colab](https://colab.research.google.com/drive/WEEK4-NOTEBOOK-TBD)

This notebook is also a chapter of the full summer notebook you build up over the program.

Here's what you'll do, step by step:

1. **Get the tools and a small search model** (~1–2 min). The first cell loads one small open model. No API key, no account needed.
2. **Load the starter notes** (instant). Twelve short planning notes, each with a source you can cite.
3. **Build the search index** (~1 min). This files the notes so they can be searched in an instant.
4. **Ask a question and get a citation** (~5 sec). Ask something. It finds the closest note and answers with the one it used. You should see your question, then an answer, and right below it the note the answer came from.
5. **Add your own notes** (your turn). Drop in 5 to 10 short planning notes of your own, in the same shape as the starter ones. Then re-run the search with a question your notes should answer.
6. **The "out of place" meter** (~5 sec). The notebook drops in a note that doesn't belong. The meter scores how well each note fits the others. An odd one sits far from the rest, so it gets flagged for review while the normal ones are left alone.

Press the ▶ button to the left of each cell to run it, or hold **Shift** and press **Enter**. If something looks off, run it again from the top. That's allowed, and it's how everyone learns.

## Your one thing

Add 5 to 10 short planning notes of your own to the notebook, ask your model a question they should answer, and watch it respond *with* a citation. Then share that little exchange — the question, the answer, and the note it cited. If the meter flagged a note as out of place, tell us which one.

To share: click **Share** in the top-right corner of the notebook, set it to "anyone with the link," and send us the link. Or copy the exchange and reply on the share thread.

The whole thing runs in about 10 to 15 minutes. A good moment to grab a snack while the first cell loads.

## No Google account? That's completely fine

Maybe your school blocks Colab, your family prefers not to use a Google account, or it isn't available where you are — that's completely fine. Reply to us and we'll sort you out on our own computers. Same notebook, same experience.

## Self-check

Here's a quick look at where you are (no pressure):

- [ ] I ran the notebook and saw an answer with a citation
- [ ] I added 5 to 10 notes of my own and asked a question they answer
- [ ] I saw the "out of place" meter flag an odd note
- [ ] I shared my question-and-citation exchange

## Stuck on anything? That's normal, just ask

Reply and tell us which cell, and we'll get you through it. No question is too small. We'd much rather hear from you early than have you worry on your own.

If this feels like a lot, leave it. You'll get there.

Next week you'll teach your model to spot bad advice — the plausible-sounding kind that looks perfectly reasonable and is still wrong. Step by step, it's becoming a real planning assistant.

Need help? Visit our [support page](/support/).
