---
title: Build your own model
description: Fine-tune a small model on your own examples and watch it pick up your coaching style.
order: 4
expanded: 2026-07-09
---
Welcome back. So far you've run code and told an AI how to behave with words. This week you go one step further: you change the model itself. By the end, you'll have a small AI that *you* taught to be a planning coach.

<!-- video: FnYqoYq4mNs -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/FnYqoYq4mNs"
    title="How to Build an AI — Week 3 film" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Stick around to the end of the video. That's where the same question gets two completely different answers, and one of them is from the model you trained.

## What fine-tuning is

A general AI model covers a little of everything and nothing about your life. Changing the model itself is called **fine-tuning**, and it's simpler than it sounds. You show it a few dozen short examples of the behaviour you want, and it picks up the pattern on its own.

Think of it the way you'd help a new person learn a job. You wouldn't hand them a rulebook. You'd show them a handful of good examples until the habit clicks.

We've prepared a starter set of about two dozen examples of a good planning coach. These are the kind that ask you a question instead of handing over a finished plan. You'll add two dozen or more of your own before training a small open model on the whole set.

That "ask first, don't do it for you" habit from your system prompt? This week you train it *into* the model, so it does it without being told every time.

The notebook doesn't retrain the whole model. It trains a small add-on called a **LoRA** (short for Low-Rank Adaptation). That add-on is what keeps the whole thing fast, free, and runnable on a basic cloud computer. You don't need to understand how it works today. It's the reason this fits inside a free notebook at all.

## Try it now

You can try this yourself right now. Open our notebook and run it top to bottom. Nothing to install, and you can't really break it. If something looks off, run it again from the top. That's allowed, and it's how everyone learns.

[▶ Open the fine-tuning notebook in Colab](https://colab.research.google.com/drive/10t6B9HPnv13iYEthzCzZNEpsFpPmQV44?usp=sharing)

*It's also a chapter of the [full summer notebook](https://colab.research.google.com/drive/14FK9IpWdEFuxsh9MPg7-I4pAPBWjwelQ?usp=sharing) you build up over the program.*

Here's what happens when you press run, step by step:

1. **The first few cells set things up** — loading the tools and the small open model. This takes about one to two minutes. You don't need to change anything here.

2. **The starter examples load.** These are short examples of a planning coach that asks instead of telling. Read a few so you can see the shape: a message from a person, and a reply from the coach.

3. **You write your own examples.** This is the important part, and where you'll spend the most time — about fifteen to twenty-five minutes. Aim for 24 to 48, in the same question-and-answer shape as the starters. The notebook has tips right above the cell. A few ideas to get you going:
   - **Start with your own week.** Think of five real things you had to plan lately — a test, a shift, a group project, a family thing, a chore list. Write what you said (or wish you'd said), and what a good coach would ask back.
   - **Use the planning-trap list.** Pick a few traps you haven't covered: no buffer time, trying to do everything at once, a goal with no first step. Write one example per trap.
   - **Draft with an AI tool, then make it yours.** Ask an AI assistant for a batch of candidates in the same format. Read each one out loud, then rewrite anything that doesn't sound like you. The rewriting is the point.
   - **Vary the person.** Different ages, moods, and situations — stressed, excited, putting things off. This way the model practises the coaching habit across many kinds of people.

   There's a helper in the cell that checks each entry as you go. If one comes out the wrong shape, the cell skips it and tells you, so you can fix it without starting over.

4. **The training runs on its own** — about twenty to thirty minutes. See that number dropping? That's the model getting better at the examples, in real time, yours included. A good moment to grab a snack, or read through this week's suggested readings and come back.

5. **The before-and-after cell runs in about thirty seconds.** This is the part worth waiting for. The same planning question goes to the plain model and to the one *you* tuned. Watch how differently they answer: the plain model hands over a finished plan, and yours should stop and ask you a question first. That's *your* model doing that. You taught it to coach instead of take over.

The whole notebook takes about thirty to forty minutes start to finish, most of which is hands-off.

## Your one thing

Open the notebook, write your examples, run it top to bottom, and send us your before-and-after. That's it.

You can share your completed notebook (click **Share**, set it to "anyone with the link"). You can also take a screenshot of the two answers side by side, or copy the text — whatever is easiest.

There are a couple of optional cells at the end that save your trained model to your own account. That way it's yours to keep and build on later. No pressure to do that this week. If you want to, the notebook walks you through it.

### If you can't use a Google account

Maybe your school blocks it, your family prefers not to, or it isn't available where you are — that's completely fine. Reach us through our [support page](/support/) and we'll get you set up to run it on our own computers.

---

**Self-check** (no pressure)

- [ ] I opened the fine-tuning notebook in Colab
- [ ] I wrote my own planning-coach examples (aiming for 24 to 48)
- [ ] I ran the notebook top to bottom and watched the training finish
- [ ] I looked at the before-and-after cell and saw how the two answers differ
- [ ] I shared my before-and-after (notebook link, screenshot, or copied text)

---

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and tell us which cell, and we'll get you through it. We'd much rather hear from you early than have you worry on your own.
