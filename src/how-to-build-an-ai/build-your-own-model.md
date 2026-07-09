---
title: Build your own model
description: Fine-tune a small model on your own examples and watch it pick up your coaching style.
order: 3
---

So far you've told an AI how to behave with words. This chapter goes one step further: you change the model itself, and by the end you'll have a small AI that *you* taught to be a planning coach.

<!-- WEEK 3 FILM (premiered 2026-07-06). To change the film, swap the embed id (FnYqoYq4mNs) below. -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/FnYqoYq4mNs"
    title="How to Build an AI — Week 3 film" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Changing the model itself is called **fine-tuning**, and it's simpler than it sounds: you show a general model a few dozen short examples of the behaviour you want, and it picks up the pattern on its own. We've prepared a starter set of about two dozen examples of a good planning coach, the kind that asks you a question instead of handing over a finished plan, and you'll add two dozen or more of your own before training a small model on the whole set.

You can watch it happen. Open our notebook and run it top to bottom. Early on there's a cell for writing in your own examples. The training then runs on its own for twenty to thirty minutes, a good moment to grab a snack. The last cell asks the same planning question to the plain model and to the one *you* tuned, so you can see how differently they answer. Nothing to install, and you can't really break it. If something looks off, run it again from the top.

[▶ Open the fine-tuning notebook in Colab](https://colab.research.google.com/drive/10t6B9HPnv13iYEthzCzZNEpsFpPmQV44?usp=sharing)

*It's also a chapter of the [full summer notebook](https://colab.research.google.com/drive/14FK9IpWdEFuxsh9MPg7-I4pAPBWjwelQ?usp=sharing) you build up over the program.*

---

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and we'll help.
