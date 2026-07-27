---
title: Name and build your agent
description: A model answers questions. An agent has a job, a name, and rules about how it works with you. Here you write one short profile in plain English, point it at the model you fine-tuned yourself, and turn what you've built into an assistant that's yours.
order: 7
---

{% filmFrame "", "Name and build your agent" %}

By now you've built a model, given it a memory, and taught it to catch bad advice. So the next
step is a smarter brain, right?

No. And this chapter turns on why.

Here's something that happens a lot. You ask a genuinely capable assistant to help plan your week, and
it hands back a confident, tidy, finished plan. Every hour filled in. It never asks you a single thing
about your life — your Thursday test, your Saturday shift, the fact that you don't function before
ten.

Nothing was wrong with the brain. What was missing was a **job**.

## A model, and an agent

A **model** answers whatever you put in front of it. That's all it does, and it does it well.

An **agent** is a model plus three things: a job, a personality, and rules about how it works with
you.

Same brain. Completely different help.

Think about the difference between someone who's very clever and someone who's very clever *and*
knows they're your planning coach. The second one asks what your week looks like before suggesting
anything. Not because they're smarter — because they understand the role they're in.

Nobody had ever told that useless-plan assistant what its role was, what to care about, or how you
like to be helped. So it guessed. And a confident guess looks exactly like a finished plan.

## It's one file, and it's plain writing

Here's the part that surprises people. Handing your model a job takes one short file.

It's called a **profile**, and it's plain writing — no code anywhere in it. You're describing your
agent the way you'd describe a good tutor to a friend:

```yaml
name: Juniper
pronouns: they/them
role: a planning coach
focus: time and project management

priorities:
  - Coach me, don't do it for me — ask a question and help me
    decide instead of producing the finished plan
  - Keep plans realistic — watch for no-buffer scheduling and
    goals with no first step
  - Always leave the next step in my hands

disposition:
  tone: warm, clear, and encouraging
  traits: [curious, patient, honest]
```

Read that first priority again. **You wrote that rule** yourself, in your own words, and you trained
it into your model. Now it's sitting in a file you control.

That profile is the only thing you touch. The shared framework everything runs on — the harness —
stays exactly as it is. Change the profile, and the harness becomes *your* agent.

## And the brain is yours

Here's the part that ties everything together. Your agent runs on the model **you** fine-tuned. Not a
borrowed one, and not something we hand you.

That's also why it already leans towards coaching. When you fine-tuned it you fed it examples of a good
planning coach — many of them written by you — and it learned to ask before it answers. The profile
gives it a name and a job; your training is what makes it *good* at the job.

It all happens in Colab, the same place you've worked throughout, so there's nothing to install on
your computer.

**Haven't fine-tuned a model yet, or your training run didn't go well?** There's one clearly-marked
line in the notebook that switches you to a shared model instead. You are not locked out of this by a
rough training run — you can do this part either way.

Let's go through the fields that matter most.

### `name`

Whatever you like. This is what it calls itself, so pick something you don't mind saying out loud.

### `pronouns`

Agents here use **they/them** unless you decide otherwise. It's the default because it's the safe
assumption for anything you haven't been told about.

### `focus`

The single most important line. This is the fence. With `focus: time and project management`, asking
your agent about history homework gets you a plain "that's not what I'm for" and a nudge back — rather
than a confident answer about something it has no business on.

### `priorities`

In order, most important first. This is where behaviour lives. Keep the coach rule at the top; it's
the thing that stops your agent doing your thinking for you.

## Your turn

1. Open the agent notebook and run the first few cells to wake your model up.
2. Give your agent a **name** and a personality that sounds like you.
3. Keep the coach rule at the top of `priorities`.
4. Run it, and ask it to help you plan something **real** that's actually on your plate.

Then watch one specific thing: **does it ask you something before it suggests anything?**

That's the whole test. If it asks first, your profile is working. If it hands you a finished plan
instead, that's not a failure — it's information, and it's usually a one-line fix in `priorities`.
Tell us what happened either way.

Editing the profile takes a few minutes. Talking to your agent is instant.

## Handing it in

Your profile goes into **your own repository** — the one you made from our starter template — and you
send us the link. That's the hand-in.

[Get your work from Colab into the project](/how-to-build-an-ai/git-from-colab/) walks you through
both ways of getting the file there: all in your browser, or without leaving Colab. You only need one.

One thing to do before you send the link: **paste it into a private browser window**, where you
aren't signed in. If the file loads, we can see it too. If it says *not found*, your repository is
private — a one-click fix, and the chapter above shows you where.

You don't need a pull request to hand your work in. That's a separate, optional step, below.

## If you want to go further

Both of these are completely optional, and neither one is on the path to your certificate.

- **Offer your profile to the project.** What you wrote is a real piece of software, not a
  practice exercise. [How to open your first pull
  request](/how-to-build-an-ai/open-your-first-pull-request/) walks you through it, and [Get your work
  from Colab into the project](/how-to-build-an-ai/git-from-colab/) covers moving the file across. A
  merged pull request lists you as a contributor, permanently. This is a step past handing your work
  in, not part of it.
- **Run it on your own computer.** Your agent already runs on your own model — this takes it one step
  further and gets it off the cloud entirely, running on your machine. Genuinely cool, and genuinely
  fiddlier than the rest of the course. Ask us and we'll walk you through it.

## If it feels like a lot

It isn't as much as it looks. You're editing a handful of lines in one file, and you can't really
break anything — if the profile goes wrong, you change a line back and run it again.

And if you're reading this thinking everyone else has already finished, they haven't. You're right on
time. No question is too small.

## Related

- [How to open your first pull request](/how-to-build-an-ai/open-your-first-pull-request/)
- [Get your work from Colab into the project](/how-to-build-an-ai/git-from-colab/)
- [Tell an AI how to behave](/how-to-build-an-ai/tell-an-ai-how-to-behave/) — where the coach rule
  started
