---
title: How to open your first pull request
description: A pull request is how you offer your work to a shared project, and getting one merged is what puts your name on it. Fork, branch, commit with a sign-off, then propose. Every step, in the browser, and completely optional.
order: 8
---

A **pull request** is how you offer your work to a shared project. It's the polite version of "here's
something I made, would you like it?" Getting one merged is what puts your name on the project as a
contributor.

This is **optional**. Your certificate doesn't depend on it. But if you'd like to try, here's every
step, and you don't have to do it alone — tell us you're going for it and we'll pair up with you.

**This isn't how you hand your work in.** Handing in is three things — the link to your own
repository, a short transcript, and why you chose the name — all listed in [Name and build your
agent](/how-to-build-an-ai/name-and-build-your-agent/), with the file-moving part
covered in [Get your work from Colab into the
project](/how-to-build-an-ai/git-from-colab/). A pull request is a step past all of that — offering
your work to the shared project — and it needs one extra thing, the sign-off, which is explained
below.

You already know most of this. In [Time travel with version
control](/how-to-build-an-ai/time-travel-with-version-control/) you made save points, looked back
through history, made a branch, and proposed a change. This is the same four moves on somebody
else's project instead of your own.

## What's new this time

Three things, and only three:

| Word | What it means |
| --- | --- |
| **Fork** | Your own full copy of someone else's project, on your account. You can't break theirs. |
| **Sign-off** | One line in your save point saying the work is yours to share. |
| **Review** | A person reads your change and usually asks a question or two before it lands. |

## Before you start

- A free **GitHub account**.
- The one file you want to contribute — most people's is their agent profile from [Name and build
  your agent](/how-to-build-an-ai/name-and-build-your-agent/).
- The link to our project. **Ask us for it** and we'll send you the exact repository — we're still
  settling its final home, so we'd rather give you a link that works than one that used to.

## The steps

### 1. Fork it

Open our project and click **Fork**, top right. That makes your own copy. Everything you do next
happens on *your* copy, so there is no way to damage the original. This is the step that makes the
whole thing safe.

### 2. Make a branch

On your fork, click the branch button and create a branch named for your change:
`planner-agent-yourname`, or `pitfall-no-buffer`. One change per branch keeps it easy to read.

### 3. Add your file

Add or edit only the file your change touches. Small and focused is genuinely better here — a
one-file pull request gets read and merged; a sprawling one sits waiting.

If your file is in Colab, [Get your work from Colab into the
project](/how-to-build-an-ai/git-from-colab/) shows you how to move it across. That's the step people
get stuck on, so it has a chapter of its own.

### 4. Commit, with the sign-off

Write a short message saying what the change does: `Add my planner agent profile`.

Then add the sign-off line. It looks like this:

```text
Signed-off-by: Your Name <your@email.com>
```

In the browser, that line goes in the **description** box — the larger second box under the commit
message, not the one-line message itself.

If you're working in a terminal instead, `git commit -s -m "Add my planner agent profile"` adds it
for you. That's what the `-s` is for.

**Why it's there:** it's called the *Developer Certificate of Origin*, and it's the same promise
you already made in your Agreement. It says the work is yours to contribute. It isn't a legal trap
and it doesn't sign away your work — you keep it, and you're giving the project permission to use
it. Most open-source projects ask for it.

### 5. Open the pull request

GitHub will show a **Compare & pull request** button. Click it, give it a clear title, and write a
couple of sentences: what it does, and why. That's the whole thing. You've contributed to an
open-source AI project.

### 6. What happens next

A facilitator reads it. Usually they'll ask a small question, or suggest a tweak, and then merge it.

**Questions are a good sign, not criticism.** It means someone read your work carefully. Every
experienced contributor gets review comments on nearly every pull request — that's what review is
for. Answer, make the tweak if you agree, and it lands.

Once it's merged, you're listed as a contributor.

## If anything goes sideways

You can't really break anything. Your fork is your own copy, every version is saved, and the
original project is untouched by anything you do.

If you get stuck, reply and tell us which step you're on and what you saw on screen. We help interns
through their first pull request all the time. It's a rite of passage, and we're glad to do it with
you.

## Related

- [Get your work from Colab into the project](/how-to-build-an-ai/git-from-colab/)
- [Time travel with version control](/how-to-build-an-ai/time-travel-with-version-control/)
- [Name and build your agent](/how-to-build-an-ai/name-and-build-your-agent/)
