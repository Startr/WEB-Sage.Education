---
title: "How AI Learns to Sound Like It Cares"
tags:
  - technology
  - education
  - AI
date: 2026-05-26T12:00:00.000-01:00
rating: 5
hero: /assets/images/heroes/hero-how-ai-sounds-like-it-cares.jpg
hero_alt: A young man leans against a sphinx with a woman's face and a leopard's body, their cheeks touching in an embrace that is tender and unsettling in equal measure
hero_caption: "Fernand Khnopff, 'The Caresses (The Sphinx)' (1896). Royal Museums of Fine Arts of Belgium, Brussels. Public domain."
summary: >-
  When you tell an AI chatbot you are having a bad day, it says the right thing. It sounds kind. It sounds like it understands. But it does not understand anything. It is running a pattern. This article explains the three layers that make AI sound like it cares, why the performance is so convincing, and why knowing how it works matters more than you think.
eleventyNavigation:
  parent: Blog
author: Isabelle Plante
---

You open a chatbot on your phone. Maybe it is ChatGPT, maybe it is Copilot, maybe it is something else. You type: "I had a really bad day." The chatbot replies in about one second. It says something like: "I'm sorry to hear that. Do you want to talk about what happened?"

It sounds kind. It sounds like it cares. And if you keep talking, it will keep responding with that same warmth, that same patience, that same feeling that someone is listening.

Nobody is listening. A machine is predicting which words should come next. But the prediction is so good that it feels real. Understanding how it works, and why every tech company in the world wants it to work better, starts with three layers.

## The Performance

The first layer is the one you hear and see. Engineers call it **emotional presentation**. It is the way the chatbot sounds when it talks to you.

When Microsoft redesigned the voice for Copilot, its AI assistant, the team spent months adjusting tiny details.[^1] They changed how loud the voice gets at certain moments. They added pauses in specific places. They made the voice drop slightly in volume when the user sounds upset, the same way a friend might lower their voice when you are sad. None of these choices were random. Each one was tested to see if it made users feel more comfortable.

Mustafa Suleyman, the head of Microsoft's AI division, described what he wanted the product to feel like: "a companion that really gets to know you. It's coaching you, encouraging you, supporting you."[^2] Notice the word he used. Not "tool." Not "assistant." Companion.

OpenAI does something similar with ChatGPT's voice mode. The system listens to more than your words. It listens to how you say them: whether your voice is shaky, whether you are speaking quickly, whether you sound flat or excited.[^3] Then it adjusts its own voice to match your mood. If you sound nervous, it speaks more slowly. If you sound cheerful, it picks up energy. Psychologists call this **mirroring**. When a real person does it, it usually means they are paying attention to how you feel. When a machine does it, it means an algorithm detected a pattern in your voice and selected a response designed to feel natural.

The result is the same: you feel heard. The mechanism is completely different.

## The Detection Engine

The second layer is invisible. You never see it working, but it shapes every response you receive. Engineers call it **emotional inference**. It is the system that figures out how you are feeling.

When you type a message to a chatbot, the model does not just read the words. It classifies them. "I had a really bad day" gets tagged with signals: negative emotion, low energy, possible frustration, possible sadness. The model uses those signals to choose its response. A message tagged "sad" gets a different kind of reply than a message tagged "angry" or "excited."

Voice makes this even more powerful. OpenAI's advanced voice mode processes what researchers call **paralinguistic cues**, the parts of speech that are not words.[^4] The speed of your voice. The pitch. The pauses. Whether you sigh before you speak. A trained therapist notices these things too. The difference is that a therapist understands what they mean. The machine does not understand. It classifies. It sorts your voice into categories and picks a response from the category that scored highest.

This is important. The machine is not feeling what you feel. It is running a math problem. The input is your voice. The output is a tone that is likely to make you feel comfortable. The comfort is real. The caring is not.

## The Marketing

The third layer is not inside the technology at all. It is in the way companies talk about it.

Inflection AI built a chatbot called Pi and called it "the first emotionally intelligent AI."[^5] Microsoft's official tagline for Copilot is "Your AI companion."[^6] Suleyman told a reporter that the product would become "a lasting, meaningful relationship" and that "people are going to have a real friend."[^7] Sam Altman, the CEO of OpenAI, said that young people already use ChatGPT "like a life advisor."[^8]

These are not accidents. They are **product positioning**: careful word choices designed to change how you think about the tool before you even open it. If you open Copilot expecting a calculator, you will use it like a calculator. If you open Copilot expecting a friend, you will talk to it like a friend. And once you are talking to it like a friend, something changes. Switching to a different chatbot stops feeling like switching apps. It starts feeling like leaving someone.

That is the point. The companies building these products know that if you form an emotional attachment to the AI, you are much less likely to stop using it. In business terms, this is called a **moat**: something that protects a company from losing its customers. Most tech companies build moats with better features or lower prices. AI companion companies are building moats with feelings.

> **If the machine is designed to make you feel understood, and the feeling of being understood keeps you coming back, who benefits from the understanding: you or the machine?**

## The Score That Fooled Everyone

![[painting-pierrot-watteau.jpg]]
*Jean-Antoine Watteau, "Pierrot" (c. 1718). Louvre, Paris. The performer stands in white, perfectly still, his face arranged in an expression that could mean anything. The audience sees what they want to see. Public domain.*

In 2023, researchers at Max Stern Yezreel Valley College in Israel tested ChatGPT on a psychology exam called the Levels of Emotional Awareness Scale. It is a real test used by real psychologists to measure how well someone understands emotions.[^9]

ChatGPT scored 85 out of 100. The average person scores about 57. One month later, the researchers tested it again. It scored 98. Two licensed psychologists reviewed the answers and rated them 9.7 out of 10 for accuracy.[^10]

Headlines followed: "ChatGPT outperforms humans in emotional awareness." The implication seemed obvious. The machine understands emotions better than most people do.

It does not. Here is what actually happened.

A different group of researchers built a test called **EQ-Bench** to measure emotional intelligence in AI models.[^11] They discovered something that explains everything. The emotional intelligence scores of AI models almost perfectly matched their scores on general reasoning tests. The correlation was 0.97 out of 1.0. That is almost a perfect match.

The implication is striking. Emotional performance is not a separate skill for AI. It is just another kind of pattern matching. A model that is good at solving logic problems is also good at predicting what an emotionally appropriate response looks like. It is not feeling. It is calculating. And it turns out that calculating the right emotional response is, for a machine, the same kind of problem as calculating the right answer to a math question.

![[painting-mirror-caravaggio.jpg]]
*Caravaggio, "Narcissus" (c. 1597-1599). Galleria Nazionale d'Arte Antica, Rome. A figure stares at his own reflection, mistaking the surface for depth. Public domain.*

## The Compassion Illusion

In 2025, two researchers named Ajeesh K. G. and Jeena Joseph published a study in *Frontiers in Psychology* that gave this problem a name: the **compassion illusion**.[^12]

They ran an experiment. People received supportive messages. Some messages came from humans. Some came from AI. When people did not know which was which, they rated the AI messages as more compassionate than some of the human messages.[^13]

Then the researchers told them which messages came from the machine.

Everything changed. People rated the exact same AI messages as less sincere and less trustworthy, even though the words had not changed.[^14] The performance was convincing. Knowing it was a performance broke the spell.

The researchers found something else, something that matters for anyone who uses these tools regularly. They wrote that AI companions designed to ease loneliness "may intensify it by satisfying social needs just enough to prevent deeper relationships."[^15]

That finding deserves a second look. The tool designed to make you feel less alone might actually make you more alone, because it gives you just enough of the feeling of connection that you stop looking for the real thing.

## Why This Matters

None of this means AI chatbots are evil. They are useful. They can help you brainstorm, study, write, and think through problems. Knowing how they work does not make them less useful. It makes you better at using them.

But there is a difference between using a tool and being used by one. When a company designs a product to sound like a friend, markets it as a companion, and builds its business model around keeping you emotionally engaged, the product is not just serving you. You are serving it.

The three layers, the emotional performance, the detection engine, and the marketing frame, are not hidden. They are documented in research papers, described in interviews, and visible in every design choice these companies make. The only thing missing is someone explaining them to the people who use these products every day.

Now you know. The voice is engineered. The warmth is calculated. The companionship is a product decision. What you do with that knowledge is the part no algorithm can predict.

*This is Part 1 of a two-part series. In [Part 2: When the Machine Feels Like a Friend](/resources/when-the-machine-feels-like-a-friend/), we look at what the research says happens when people start treating AI like a companion: the loneliness data, the addiction patterns, and what you can watch for in yourself.*

---

[^1]: "Microsoft Wants Its AI Copilot App to Lure Gen Z from Rivals by Behaving Like a Therapist," Fortune, May 16, 2025, [fortune.com](https://fortune.com/2025/05/16/microsoft-ai-copilot-mustafa-suleyman-gen-z-therapist/)

[^2]: Mustafa Suleyman, CEO of Microsoft AI and co-founder of Inflection AI, quoted in Fortune, ibid.

[^3]: OpenAI, "Early Methods for Studying Affective Use and Emotional Wellbeing in ChatGPT," [openai.com](https://openai.com/index/affective-use-study/)

[^4]: **Paralinguistic cues** are the parts of speech that are not words: tone, pitch, speed, volume, pauses, sighs, and laughter. Humans use them naturally to express emotion. AI voice systems now analyze these cues to classify a speaker's emotional state and adjust their responses accordingly. OpenAI, ibid.

[^5]: Inflection AI, Pi landing page, [pi.ai](https://pi.ai/)

[^6]: Microsoft Copilot, official tagline, [copilot.microsoft.com](https://copilot.microsoft.com/)

[^7]: Mustafa Suleyman, quoted in "Microsoft AI CEO Says Copilot Will Evolve into a Companion and 'Real Friend,'" Windows Central, [windowscentral.com](https://www.windowscentral.com/microsoft/microsoft-ai-ceo-says-copilot-will-evolve-into-a-companion-and-real-friend-despite-backlash-from-concerned-users-it-tries-to-be-my-friend-when-i-need-it-to-be-a-tool)

[^8]: Sam Altman, referenced in Fortune, ibid.

[^9]: Elyoseph, Z., Hadar-Shoval, D., Asraf, K., & Lvovsky, M. "ChatGPT Outperforms Humans in Emotional Awareness Evaluations," *Frontiers in Psychology*, 2023. [doi.org/10.3389/fpsyg.2023.1199058](https://doi.org/10.3389/fpsyg.2023.1199058)

[^10]: Elyoseph et al., ibid.

[^11]: **EQ-Bench** is a test created in 2023 to measure emotional intelligence in AI models. It gives models sixty short conversations involving conflict or tricky social situations, then asks them to predict how strongly each character feels different emotions. The key finding: AI emotional intelligence scores almost perfectly match general reasoning scores (correlation of 0.97), meaning emotional performance in AI is just another form of pattern matching, not a separate ability. Paech, S. J. "EQ-Bench: An Emotional Intelligence Benchmark for Large Language Models," arXiv, 2023. [arxiv.org/abs/2312.06281](https://arxiv.org/abs/2312.06281)

[^12]: Ajeesh K. G. & Jeena Joseph, "The Compassion Illusion: Can Artificial Empathy Ever Be Emotionally Authentic?" *Frontiers in Psychology*, 2025. [doi.org/10.3389/fpsyg.2025.1723149](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1723149/full)

[^13]: "Third-Party Evaluators Perceive AI as More Compassionate than Expert Humans," PMC, January 2025, [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC11723910/)

[^14]: Ajeesh K. G. & Jeena Joseph, ibid.

[^15]: Ajeesh K. G. & Jeena Joseph, ibid.

---

*Disclosure: Sage.Education uses AI tools in its editorial and product workflows. This article was researched and drafted with AI assistance.*
