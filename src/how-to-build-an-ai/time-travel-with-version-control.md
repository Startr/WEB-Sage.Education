---
title: Time travel with version control
description: Version control is a time machine for your work. Save a version, look back through its history, and try risky changes on a side timeline without losing the good one. This week, all in your browser.
order: 6
---

This is the second half of Week 5. Earlier this week you built a pitfall filter, something worth keeping. So here's a fair question: if you change it tomorrow and it breaks, is the good version gone?

No. There's a tool that saves a copy every time you want, right where things are, and lets you jump back to any of them. It's called **version control**, and the most popular one for code and text is **Git**. Think of it as time travel for your work. Every save is a point you can return to, and you can try a risky change on a side timeline without touching the version that already works.

<div class="premiere-frame" style="--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; --bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;">
  <iframe src="https://www.youtube.com/embed/ZoAMHMXiPvw"
    title="How to Build an AI — Time travel with version control" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Watch the walkthrough above, then try it yourself with the steps below.

Four plain words carry the whole idea:

- A **commit** is a save point, with a short label so future you knows what changed.
- The **history** is the list of your save points. Step back to any one of them. That's the time travel.
- A **branch** is a side timeline. Try something risky there; your master version stays safe.
- A **pull request** is politely proposing that your change join the master version, so a person can look first.

## Git is the tool, not the website

Here's a common mix-up worth clearing up. Git is the tool, and it's separate from the website you keep your work on. **GitHub** is one popular place to keep your work, but it's just one option, and it isn't Git itself. Others include **GitLab** and **Gitea**. Gitea is open-source, and you can run it on your own computer or server. Our team runs its own, so much of our code lives on hardware we control instead of rented from someone else.

> That's the whole idea in miniature: own your tools, and choose where they live.

For this chapter we use GitHub, because a free account works in any browser and it's the quickest way to see version control in action. Most buttons work the same way on Gitea and the others, so nothing here locks you in.

## Try it now

We do this one right in your browser. Nothing to install, no terminal, and it works on a Chromebook or a phone. In a few small steps you'll make a free account, copy our starter, save a change, look back through its history, and propose an update:

1. Go to **github.com** and **Sign up** for a free account.
2. Open our starter, **[Startr/Sage.Education-Starter](https://github.com/Startr/Sage.Education-Starter)**, and click the green **Use this template**, then **Create a new repository**. Give it a name, keep it **Public**, and click **Create**. Now you've got your own copy.
3. Open `my-pitfall-filter.md`, click the **pencil** to edit, add a trap of your own, and click **Commit changes**. That's your first save point.
4. Click **History** and open an older save point. There's your file, exactly as it was. Nothing is lost.
5. Make a **branch**, change the file there, and click **Compare & pull request** to propose it. On your own copy you can click **Merge** yourself.

That's the whole loop: save, look back, branch, propose. It's the same tool professional teams use every day.

Your copy's main line is called **master**. That's our house convention, borrowed from crafts that got there first. A record or CD is pressed from the master, and a goldsmith casts from a master mould, the trusted original every good copy comes from. The buttons work the same whether a project calls it "master" or "main", so nothing here locks you in.

## Where this is heading

Next week you'll use this for real: you'll propose your pitfall filter to the Startr Agent harness, the shared project your agent runs on. It's the same buttons, plus one first step, making your own copy of someone else's repo, called a **fork**. There's one small extra step then, a sign-off, that just says the work is yours to share. We'll walk you through it.

## A quick self-check (no pressure)

<ul class="checklist">
  <li><input type="checkbox"> I made a free account and a repository in the browser.</li>
  <li><input type="checkbox"> I saved a file, then looked back at an older version.</li>
  <li><input type="checkbox"> I made a branch and opened a pull request.</li>
  <li><input type="checkbox"> I know Git is the tool, and GitHub is just one place to keep it.</li>
  <li><input type="checkbox"> I know I can ask for help anytime, about anything.</li>
</ul>

Tick those and your work has a time machine, on tools you can own.

---

Stuck on anything? That's normal, just ask. No question is too small — reach us through our [support page](/support/) and we'll help.
