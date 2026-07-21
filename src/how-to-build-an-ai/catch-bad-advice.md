---
title: Catch bad advice
description: Some bad advice reads completely normal, so a meter that only spots what's odd sails right past it. This week your model learns to catch it and hand it to a person.
order: 5
---

Last week your model got a meter that flags anything out of place. A note that doesn't fit lights it up. So a bad plan should set it off too, right?

Actually, no. And that's this week's whole point. Take this one: "Book every hour, skip lunch, push straight through." Your meter stays flat. Every word is ordinary. It reads perfectly fine, and it's still bad advice.

<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/MMQYKeIHjLs"
    title="How to Build an AI — Week 5 film" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

This week's film shows the filter in action: a plan that reads perfectly fine, and the one trap that makes it risky. Stick around to the end. That's where you see it get caught.

Here's the puzzle. That meter watches for **weirdness**. A sentence that doesn't fit gets flagged. But "skip lunch and push through" is a perfectly ordinary sentence. It reads fine. It's still bad planning advice.

When we first hit this, it seemed backwards to us too. The meter doesn't measure whether a plan is wise. It measures whether the words are surprising. Bad advice, written in calm and confident sentences, isn't surprising at all. So the better it sounds, the more invisible it becomes.

## A short list beats a smart guess

The fix is refreshingly low-tech. You give your model a short list of common planning traps, written in plain words. That list is called a **pitfall filter**, and it's simpler than it sounds: a plan goes in, and any trap it matches comes back flagged.

The starter list has traps like these: a schedule with no buffer between tasks, a goal with no first step, and the myth that doing three things at once saves time. You get eight or ten to start, and you add your own.

Picture a plan for exam week: every hour booked, colour-coded, not a single gap. It looks like the most responsible schedule you've ever seen. But there's no room for anything to run long, so the first thing that does knocks over everything after it. Nothing about it looked risky on Monday. That's exactly the kind of plan a pitfall filter catches, not because it looks odd, but because it matches a trap you named.

Notice what the filter doesn't do. It doesn't decide for anyone. It raises a hand and says a person should take a look. That's the idea all summer: keep a person in the loop.

## Try it now

You can try the whole thing yourself right now. Open our notebook and run it top to bottom. Drop in a few draft plans, and watch the filter flag the risky one and tell you which trap it hit. Nothing to install, and you can't really break it. If something looks off, run it again from the top. That's allowed, and it's how everyone learns.

[▶ Open the Week-5 pitfall-filter notebook in Colab](https://colab.research.google.com/drive/17mMHIFiuw9wzUImqcQ7vEFHXyA0ygAgT?usp=sharing)

*It's also a chapter of the [full summer notebook](https://colab.research.google.com/drive/14FK9IpWdEFuxsh9MPg7-I4pAPBWjwelQ?usp=sharing) you build up over the program, so your earlier work is right there with it.*

## Your one thing

Open the notebook and run a few draft plans through the filter. Then add one new trap of your own, in your own words, and check that it catches a fresh example. The notebook runs in a few minutes, so writing the trap is the real work, and it's the fun part. When you've got a trap you're proud of and a plan it flags, that's the thing to share.

No Google account, or Colab isn't an option for you? That's completely fine. Maybe your school blocks it, your family prefers not to, or it isn't available where you are. Reply to this week's email and we'll set you up on our own computers instead. Nobody gets stuck. There's always a path that works for you.

## Keep your work safe: time travel

You made something worth keeping this week. The next skill is how to save it, step back through its history, and try changes without ever losing the good version. It's called **version control**, a time machine for your work, and it's short and all in your browser.

It has its own chapter, so head there next: **[Time travel with version control](/how-to-build-an-ai/time-travel-with-version-control/)**.

## Where this is heading: Week 6

Next week is a big one. You give your model a name and bring the pieces together, its memory and this new filter, into an assistant that's really yours.

And this little filter? It's a real, useful piece of software. So if you'd like, it can become your first contribution to the open-source project your agent runs on, the Startr™ Agent harness. We'll walk through that together, step by step. It's completely optional, with no rush and no pressure, so just reply to this week's email if you'd like in. The version-control skill from the next chapter is the key you'll use to do it.

## A quick self-check (no pressure)

<ul class="checklist">
  <li><input type="checkbox"> I ran a few draft plans through the filter.</li>
  <li><input type="checkbox"> I saw it flag a bad plan and name the trap it hit.</li>
  <li><input type="checkbox"> I added one new trap of my own, in plain words.</li>
  <li><input type="checkbox"> I checked that my trap catches a fresh example.</li>
  <li><input type="checkbox"> I know I can ask for help anytime, about anything.</li>
</ul>

Tick those and your model can catch the plausible-bad, not just the clearly-odd. Next chapter: keep your work safe with time travel.

---

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and we'll help.
