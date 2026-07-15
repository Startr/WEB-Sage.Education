---
title: Give your model a memory
description: Give your model a small set of notes it can look things up in and quote, so its advice points to a real source instead of a guess.
order: 4
---

Last week you trained your own AI model. This week you give it something to remember.

<!-- WEEK 4 FILM (premiered 2026-07-14). To change the film, swap the embed id (Uxxgpt0n_Sc) below. -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/Uxxgpt0n_Sc"
    title="How to Build an AI — Week 4 film" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

This week's film: your model gets a memory it can quote from, so its advice points at a real note instead of a guess. It pairs with the task below.

Your model is clever, but on its own it works from memory, and memory can fill a gap with something that was never true. A **knowledge base** fixes that. A knowledge base is a small set of notes your model can look things up in and quote. Ask it a question, it finds the note that fits, answers from that note, and tells you which one it used. It's simpler than it sounds: notes go in, cited answers come out.

That last part is worth pausing on. The answer arrives with a *citation*, a pointer to the exact note it drew from, so you can check the source yourself. It turns "trust me" into "here's where I got that."

## When a note looks out of place

There's one more tool, and it has a scary name we'll make friendly: **perplexity**. Think of it as a meter that rises when a note looks out of place, like a sentence that doesn't fit the rest. It's an early warning. If a bad note slips into your knowledge base, the meter flags it so a person can take a look before your model ever quotes it. It won't catch everything, and that's next week's whole topic, but it catches the clearly odd notes for free.

## Try it now

You can try the whole loop yourself right now. Open our notebook and run it top to bottom. Early on there's a cell where you drop in your own notes, then a cell where you ask a question and watch the answer come back with its citation. Add a note that clearly doesn't belong, and you'll see the meter flag it. Nothing to install, and you can't really break it. If something looks off, run it again from the top. That's allowed, and it's how everyone learns.

[▶ Open the Week-4 KB notebook in Colab](https://colab.research.google.com/drive/1gevxXvoV7cJ_uOWPeIv2vLC6e8jn2YlY?usp=sharing)

*It's also a chapter of the [full summer notebook](https://colab.research.google.com/drive/14FK9IpWdEFuxsh9MPg7-I4pAPBWjwelQ?usp=sharing) you build up over the program.*

## Your one thing

Open the notebook and drop in five to ten short planning notes of your own. Ask your model a question it should answer from them, then read the answer together with the note it cited. After that, take a look at the one note the meter flags as out of place. The notebook runs in about ten to fifteen minutes, and the questions answer instantly. When you have an answer with a citation you like, that's the thing to share.

No Google account, or Colab isn't an option for you? That's completely fine. Maybe your school blocks it, your family prefers not to, or it isn't available where you are. Reply to this week's email and we'll set you up on our own computers instead. Nobody gets stuck. There's always a path that works for you.

## A quick self-check (no pressure)

<ul class="checklist">
  <li><input type="checkbox"> I opened the notebook and ran it top to bottom.</li>
  <li><input type="checkbox"> I added a few short notes of my own.</li>
  <li><input type="checkbox"> I asked a question and saw the note my model cited.</li>
  <li><input type="checkbox"> I looked at the note the meter flagged as out of place.</li>
  <li><input type="checkbox"> I know I can ask for help anytime, about anything.</li>
</ul>

Tick those and your model has a memory it can cite.

---

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and we'll help.
