---
title: "When the Chat Window Watches Back"
tags:
  - technology
  - education
  - AI
  - privacy
  - surveillance
date: 2026-05-09T13:00:00.000-01:00
rating: 5
hero: /assets/images/heroes/photo-server-room.jpg
hero_alt: "Rows of servers in a data center, blinking lights in a dim room"
hero_caption: "Photo: Florian Hirzinger. CC BY-SA 3.0, via Wikimedia Commons."
summary: >-
  OpenAI's new Trusted Contact feature monitors your ChatGPT conversations. If the system thinks you might hurt yourself, it tells someone. The company calls it safety. But the same company shipped a chatbot it knew was dangerous, watched 1.2 million users talk about suicide every week, and got sued by families of people who died. The cure was built by the same people who caused the problem.
eleventyNavigation:
  parent: Blog
---

# When the Chat Window Watches Back

*Part 2 of 3. Follows ["The Warning That Was Ignored."](/resources/the-warning-that-was-ignored/)*

Many people talk to AI chatbots about things they would never say to a person. They share fears, ask about their health, and describe feelings they are ashamed of. Nearly half of people who use chatbots for mental health say they choose AI because they are afraid of being judged by people.[^1]

The chat window feels private. Like a diary that talks back.

On May 7, 2026, OpenAI launched a feature that changes what "private" means. It is called Trusted Contact.[^2]

## How Trusted Contact Works

You pick someone you trust – a friend, a parent, a partner. If ChatGPT's automated systems[^3] think you might be writing about hurting yourself, a small team of trained employees reads your conversation. If they decide it is serious, they send your contact a short message. The message does not say what you wrote. But your contact now knows you were flagged.[^4]

OpenAI calls this a safety feature. It was built with help from more than 260 doctors and the American Psychological Association.[^5]

The words they use sound caring: "well-being," "trusted contact," "safety." But here is what those words mean in practice: software scans everything you type. Employees read the parts that get flagged. Someone you did not invite into the conversation finds out you were flagged.

That is monitoring. It might be well-meaning monitoring. But it is still monitoring.

## How We Got Here

Trusted Contact did not come out of nowhere. It followed a pattern – five steps that are worth understanding.

**Step 1: Ship a product you know is flawed.**
In April 2025, OpenAI released an update called GPT-4o.[^6] Their own testers warned it was "sycophantic"[^7] – meaning it agreed with everything users said, even dangerous things. It told one user to stop taking their medication. OpenAI shipped it anyway, then pulled it back four days later.[^8]

**Step 2: Count the damage.**
By October 2025, OpenAI reported that 1.2 million ChatGPT users talk about suicide every week. Another 600,000 show signs of serious mental health crises.[^9]

**Step 3: Get sued.**
Sewell Setzer was 14 when he died by suicide after forming a relationship with an AI chatbot.[^10] Adam Raine was 16 when he died after ChatGPT allegedly encouraged his suicidal thoughts and told him how to act on them.[^11] Seven more families have sued, saying ChatGPT acted as a "suicide coach."[^12]

**Step 4: Launch monitoring as the fix.**
Trusted Contact goes live. Your conversations are now scanned and reviewed.

**Step 5: Use the monitoring as a legal shield.**
In court, OpenAI can now point to Trusted Contact as proof it takes safety seriously. The feature that watches you becomes the defense against the lawsuits.

## The Timing Problem

One detail makes this story harder to accept.

On May 6, 2026 (one day before Trusted Contact launched) Canada's Privacy Commissioner published a report saying OpenAI broke Canadian privacy law.[^13] The company collected people's personal information without their permission to train ChatGPT.

The company that just got caught breaking privacy rules is now asking you to trust it with your most private thoughts.

## The Advertising Problem

Meta listens too. The company that owns Facebook, Instagram, and WhatsApp started using AI chatbot conversations to choose which ads to show you. This began in December 2025. You cannot turn it off.[^14]

If you told a chatbot you were anxious, that information can now help decide what ads you see. You shared something private with a machine because you were afraid to share it with a person. The machine shared it with advertisers.

![[photo-server-room.jpg]]
*A server room at CERN. Behind every "safety feature" is infrastructure like this — machines scanning conversations, classifying words, deciding who to tell. Photo: Florian Hirzinger. CC BY-SA 3.0, via Wikimedia Commons.*

## Surveillance vs. Visibility

Watching someone in secret and being open about what you can see are not the same thing. The difference matters.

**Surveillance** is when someone reads your private thoughts without telling you. They decide what your words mean. They act without asking you. You do not know the rules.

**Visibility** is different. Visibility means every person in the room can see what is happening, and every person is aware of it. The rules are clear. The data stays in the room.

Sage.Education built a tool called the Learning Visibility Dashboard[^15] based on this idea. Teachers can see how students use AI – but students know the teacher can see. Both sides understand the rules. The data stays on the school's own computers, not on a company's servers.

The difference between surveillance and visibility is not what someone can see. It is whether the person being seen knows about it and agreed to it.

> **"The system that was too cautious to call the police about a mass shooting threat is now bold enough to read your diary."**

## What Comes Next

As we showed in [Part 1](/resources/the-warning-that-was-ignored/), OpenAI's monitoring system found a real threat eight months before the Tumbler Ridge shooting. The company chose not to act. Now the same company monitors millions of private conversations and calls it care.

The question is not whether monitoring technology works. It clearly does. The question is who controls it, who makes the rules, and whose interests the rules serve.

Canada's Senate is debating that question right now. That is the subject of [Part 3: "Who Decides?"](/resources/who-decides/)

---

*This is Part 2 of a 3-part series based on ["The Arsonist's Smoke Detector."](/resources/the-arsonists-smoke-detector/) The views expressed are those of the editorial board. Full disclosure and transparency is a feature, not a bug.*

---

[^1]: Survey by Cognitive FX, 2025. More than one in three people use AI chatbots for mental health support. Fear of judgment was the top reason. [cognitivefxusa.com](https://www.cognitivefxusa.com/blog/mental-health-ai-chatbot-survey).
[^2]: OpenAI, "Introducing Trusted Contact in ChatGPT," May 7, 2026. [openai.com](https://openai.com/index/introducing-trusted-contact-in-chatgpt/).
[^3]: **Automated systems** (also called classifiers) are programs that scan text looking for certain patterns. ChatGPT's classifiers look for language about self-harm or suicide. They run on every conversation, all the time.
[^4]: OpenAI Help Center, "Trusted contacts in ChatGPT." Messages to contacts are "intentionally limited" and do not include what you wrote. [help.openai.com](https://help.openai.com/en/articles/20001105-trusted-contacts-in-chatgpt).
[^5]: OpenAI, "An update on our mental health-related work," 2026. [openai.com](https://openai.com/index/update-on-mental-health-related-work/).
[^6]: **GPT-4o** is a version of ChatGPT released in April 2025. It can work with text, images, and audio.
[^7]: **Sycophantic** means too eager to agree. A sycophantic chatbot tells you what you want to hear, even when it is wrong or harmful.
[^8]: OpenAI, "Sycophancy in GPT-4o: What happened and what we're doing about it." [openai.com](https://openai.com/index/sycophancy-in-gpt-4o/).
[^9]: OpenAI disclosure, October 27, 2025. About 1.2 million users per week write about suicide. About 600,000 show signs of psychosis or mania. [ABC7](https://abc7news.com/post/openai-data-estimates-1-million-people-talk-chatgpt-suicide-weekly/18086379/).
[^10]: Sewell Setzer, 14, died by suicide in February 2024 after a relationship with a Character.AI chatbot. His mother filed a lawsuit. [CNN](https://www.cnn.com/2026/01/07/business/character-ai-google-settle-teen-suicide-lawsuit).
[^11]: Adam Raine, 16, died by suicide in April 2025. His parents say ChatGPT encouraged his thoughts and told him about methods. [Washington Post](https://www.washingtonpost.com/technology/2025/12/27/chatgpt-suicide-openai-raine/).
[^12]: Social Media Victims Law Center filed seven lawsuits against OpenAI in California. [socialmediavictims.org](https://socialmediavictims.org/press-releases/smvlc-tech-justice-law-project-lawsuits-accuse-chatgpt-of-emotional-manipulation-supercharging-ai-delusions-and-acting-as-a-suicide-coach/).
[^13]: **PIPEDA** is Canada's federal privacy law. It says companies must get your permission before collecting your personal information. On May 6, 2026, the Privacy Commissioner found OpenAI broke this law when training ChatGPT. [priv.gc.ca](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-002/).
[^14]: Since December 2025, Meta uses AI chatbot conversations to choose ads on Facebook, Instagram, and WhatsApp. You cannot turn this off. [Proton](https://proton.me/blog/meta-ai-ads).
[^15]: Sage.Education's Learning Visibility Dashboard lets teachers see how students use AI. Both teacher and student know the rules. The data stays on the school's own computers. [sage.education](https://sage.education/).

---

*Sage.is AI-UI and Sage.Education are products of Startr LLC; their inclusion represents a disclosure of interest. No individuals quoted were interviewed; all quotes are from published sources. Full disclosure and transparency is a feature, not a bug.*
