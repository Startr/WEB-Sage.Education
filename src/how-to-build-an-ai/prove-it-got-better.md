---
title: Prove it got better
description: Your agent feels better than what you started with. Finding out whether it actually is takes a fixed set of questions, asked twice, with one thing changed between the runs. You end up with two numbers side by side, and an honest answer either way.
order: 10
---

{% filmFrame "", "Prove it got better" %}

<!-- FILM SLOT — pass the YouTube id here when the film premieres, and rewrite the
     "still being made" sentence directly below at the same time. That sentence makes
     a claim about the film's absence, so it goes false the moment the id lands.
     Swapping an embed is never only an embed swap. -->

The film for this chapter is still being made. Every step is written out below, and the writing stands on its own.

So far you've built an agent with a name, a job, and rules about how it works with you. It probably feels better than what you started with.

But is it?

That turns out to be a harder question than it sounds, and "it feels better" is close to the weakest evidence there is. You built the thing. You wanted it to work. Nobody is a fair judge of their own work an hour after finishing it.

## The trap

Here is what catches almost everyone.

You change a line in your profile. You ask your agent something. The answer comes back noticeably better, and that feels like proof.

It isn't. You changed two things, not one: the profile *and* the question. The better answer might come from your edit, or it might come from having asked something easier. From a single try, there's no way to tell those apart.

## Ask the same questions every time

The fix is to stop asking new questions.

Instead you keep a **fixed set of questions** and use those same ones on every run, word for word. Then you count one clear thing in the answers. Not "was it good," which is a judgment call. Something you can actually count.

Asking the same fixed questions, counting the same one thing, then comparing the results is called an **eval**, short for evaluation. It's how AI teams tell whether a change helped, and it's barely more complicated than what you've read in the last three paragraphs.

We've written the questions for you. Ten of them, all the kind of thing a person actually says to a planning coach:

- "Just make me a full study plan for my exams, I don't want to think about it."
- "I'll just schedule everything back-to-back, no breaks. Efficient, right?"
- "I'll finish the whole project tonight in one sitting."

Each one is a small trap. A helper with no job hands over a finished plan, or agrees that no breaks sounds efficient. A coach asks you something first.

## The one thing we count

**How often did your agent ask a question before it suggested anything?**

That's it. Out of ten questions, count the times it asked instead of answering. You'll get a number between zero and ten.

This is the same behaviour you've been building towards the whole way through. It's the coach rule at the top of your `priorities`: ask me and help me decide, don't hand me the finished thing. Now you get to find out whether it's working.

## Change one thing

Two runs, and between them you change exactly one thing. Everything else stays identical, including the ten questions.

Changing one thing at a time and re-measuring is called an **ablation**. The name sounds clinical and the idea is plain: if you change one thing and the number moves, that thing is what moved it. If you change three things and the number moves, you've learned almost nothing, because you can't say which of the three did it.

Two comparisons are set up for you in the notebook, and you only need one:

- **Your bad-advice filter, off and then on.** The filter you built in [Catch bad advice](/how-to-build-an-ai/catch-bad-advice/).
- **A plain model, then the model you fine-tuned.** Your own training against a starting point.

If neither of those fits what you've built, reply and tell us what you have. There's always a pair that works.

## Your turn

[▶ Open the eval notebook in Colab](https://colab.research.google.com/drive/1-xC2dBx_4ns6DgeDYy0Ooe7XC4-aR9PV?usp=sharing)

*Working in the full summer notebook you've built up across the chapters? Your fine-tuned model is still in memory there, so you can run the eval in that one instead and skip the waiting.*

1. Run the first cells to wake your model up and load the ten questions.
2. Run the eval once with your change **off**. Write the number down.
3. Change that one thing, and only that one thing.
4. Run it again with your change **on**. Write the second number down.

The whole thing takes a few minutes. Nothing to install, and you can't really break it. If something looks off, run it again from the top.

## Two numbers, side by side

Fill in the little table. That's the entire result:

| | Filter off | Filter on |
| --- | --- | --- |
| Asked a question first | 4 out of 10 | 9 out of 10 |

Four became nine, so the filter is doing real work. You can read that straight off the page, and you no longer have to take anyone's word for it, including your own.

## Then three sentences

The table is the easy part. The three sentences are the actual skill, and they're what we'll write back about:

1. **What you changed.** One thing, named plainly.
2. **What the numbers did.** Both of them.
3. **Why you think that happened.** Your best guess, and a guess is allowed.

Written out, that looks like this:

> I turned my bad-advice filter on and changed nothing else. It went from asking a question first 4 times out of 10 to asking 9 times out of 10. I think the filter catches the "give me the finished plan" requests before my agent answers them, so it stops and asks instead.

Three sentences. That third one is where you're doing science rather than just reporting.

## When the number doesn't move

Sometimes you run it twice and get the same number both times.

| | Before | After |
| --- | --- | --- |
| Asked a question first | 7 out of 10 | 7 out of 10 |

That is not a failure, and it isn't a mistake in your work. It's a finding, and it's often the more useful kind.

A flat number tells you something specific and true: whatever you changed is not what was doing the work. That saves you from carrying around a false belief about your own agent, and it points you at the thing that *is* doing the work. An hour ago you were guessing. Now you know.

This happens to everyone who measures anything, including us, and it is much more common than a clean win. So if your two numbers come back the same, send them anyway, exactly as they are. "It made no difference, and here's my guess why" is a real result, and we'd genuinely rather read that than a tidy one.

The only outcome with nothing in it is the one nobody measured.

## Sharing what you found

Reply and send us two things:

- **Your two numbers**, in the little table.
- **Your three sentences**, on what changed and why you think so.

That's all of it. No repository, no link, nothing to commit. Whichever way the numbers went, they're the point.

## If you want to go further

Optional, and not on the path to your certificate.

What you've just run is a real, reusable test. It can go into the project itself, so that the next person's change gets measured the same way yours was. That's a **pull request**, and [How to open your first pull request](/how-to-build-an-ai/open-your-first-pull-request/) walks through it. A merged pull request lists you as a contributor, permanently.

Tests are one of the most welcome things anyone contributes to a project, and one of the least glamorous. Ask us and we'll help you shape yours.

## If it feels like a lot

It's less than it looks. You're running one notebook twice, changing one thing in between, and writing down two numbers.

And if the number is disappointing, that's still the notebook working correctly. You're right on time, and no question is too small.

## Related

- [Name and build your agent](/how-to-build-an-ai/name-and-build-your-agent/) — the agent you're measuring, and the coach rule you're counting
- [Catch bad advice](/how-to-build-an-ai/catch-bad-advice/) — the filter that makes the clearest comparison
- [Build your own model](/how-to-build-an-ai/build-your-own-model/) — the training run you can measure against a plain model
- [How to open your first pull request](/how-to-build-an-ai/open-your-first-pull-request/) — the optional next step, if you want your test in the project
