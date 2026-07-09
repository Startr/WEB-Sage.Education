---
title: Your first notebook
description: Meet Python, run your very first line of code, and make a notebook that says hello.
order: 1
---

This is where you run code for the first time. If you've sorted your account access (that's the [Start here](/how-to-build-an-ai/start-here/) chapter), you have everything you need.

<!-- WEEK 1 FILM (premiered 2026-06-22). To change the film, swap the embed id (6wkKpRsQfiU) below. -->
<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/6wkKpRsQfiU"
    title="How to Build an AI — Week 1 film" loading="lazy"
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

Want yours shown here as an example for the next person starting out? Just tell us. As long as your consent and release form are sorted, we may feature a few standout first notebooks to help others find their footing.

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

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and we'll help.
