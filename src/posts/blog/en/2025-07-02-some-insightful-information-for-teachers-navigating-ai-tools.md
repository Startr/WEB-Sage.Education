---
layout: layouts/blog.njk
title: Some insightful information for teachers navigating AI tools
tags:
  - education
date: 2025-07-02T09:29:00.000Z
rating: 5
summary: >-
  Imagine having a superpower that saves you hours of grading time, only to have
  it taken away due to concerns about student data privacy. For many educators,
  this is a harsh reality. What if you could use AI to enhance your teaching,
  while also keeping your students' sensitive information safe?


  As we dive into the world of AI-powered education, it's essential to understand the importance of data privacy and local AI models. If you're just starting to explore AI in the classroom and are worried about navigating the complex landscape of privacy and security, you're not alone. This article is your introduction to understanding the potential of AI while prioritizing the well-being of your students.
eleventyNavigation:
  parent: Blog
---
**Understanding AI Data Privacy** 

*A high school English teacher uses an AI tool to assist in grading papers. They're unsure whether those papers will remain in the 'cloud' or be deleted after they're corrected. The teacher reviews the FAQs of the AI company and is relieved to learn that in their privacy policy, it says that "...they use your data only to run it through their models and do not store it afterward."* 

The fate of your data with AI tools depends on the tool. When you send information to major AI companies like OpenAI (ChatGPT), Google (Gemini), or Anthropic (Claude), they store that data on their servers. Your data fuels their models. Data is precious to these companies because it helps them improve their models. So, remember that if you're writing an email with AI assistance, some companies receive and store every line of the email you share. OpenAI has recently been court-ordered to keep ALL chats (even your deleted ones and your incognito ones)!

Some companies take a different approach. Groq, which hosts open-source AI models, explicitly states that it does not store user data. Their privacy policy is clear: ["We do not retain your data...We do not train on your data."](https://groq.com/privacy-policy/) Groq processes your input through their models but doesn't save it afterward. This transparency is key. If a company isn't upfront, its silence might mean it is storing your data, even using it to improve its underlying AI models. Using open-source models has become a crucial strategy for ensuring data safety.

---

**Open Source Models and Local Privacy** 

*A middle school principal was concerned about student essays being stored by AI companies. The IT department set up a local AI model using Ollama on school laptops. Now, students can get writing help without any data leaving the building. The principal sleeps better, and the students still benefit from AI assistance.*

Open-source AI models offer a privacy-first alternative. These models have publicly available code, meaning you can download and run them on your own computer. 

When you run an AI model locally, you create a closed loop. No data leaves your device. No company acts as an intermediary. No data leaks and no third-party servers. Tools like Ollama make running AI models surprisingly accessible. If you have an Apple computer with an M1 or better (M2 etc) or a PC with a dedicated neural processing unit (NPU), you can run these models locally.

--- 

**Challenges of Running AI Models Locally**

*A math teacher might want to use AI to create practice problems. The local model on her laptop could generate basic algebra questions but struggled with complex calculus. She could end up using a hybrid approach, combining local models for simple tasks with cloud services (using careful data selection) for complex ones.*

Local models come with limitations. They're smaller and less capable than their cloud-based 

cousins. While modern AI PCs (like [Dell's AI PCs with built-in NPUs](https://www.dell.com/support/kbdoc/en-us/000223944/how-to-identify-ai-enabled-windows-computers)) or powerful Macs (like M1/M2 Pro/Max processors) can handle inferencing, their raw compute power still struggles with the largest foundation models. Expect some models to be too slow or even impossible to run directly on a laptop.

Even with apps like Olama and [Sage.is](http://sage.is/) making local hosting simpler, you need realistic expectations. These locally hosted models are generally much smaller, often with limited parameters (e.g., fewer than several billion). Performance-wise, smaller models aren't usually *better* at everything. This leads us to a helpful rule of thumb: size matters.

Think of model parameters like neurons in a brain. A model with 70 billion parameters (like Llama 70B) has more "brain power" than one with 7 billion parameters. Tens to hundreds of millions can handle basic tasks. Billions offer professional-grade performance. More parameters generally mean better performance across diverse tasks. Your laptop might handle a 7-billion-parameter model, but it will run slowly and may not perform as well as the massive models running in data centers.

---

**Specialized Models: Smarter Spending** 

*A school district was spending $200 per month on AI tools to categorize parent communications. Their IT coordinator fine-tuned a small open-source model specifically for their needs. The new system runs locally and performs better at the specific task while costing nothing in ongoing fees.*

You don't always need a PhD-level AI for simple tasks. Foundation models are large language models that encompass a wide range of knowledge. They are trained on vast amounts of data from the internet and can generate text based on this knowledge. Using a large, general-purpose model for small, specific tasks can be costly and inefficient. Do you really need a model that knows everything about the universe to identify spam emails? Fine-tuning smaller, specialized models for specific tasks often makes more sense than using expensive, general-purpose models.

Fine-tuning a model involves taking your specific data samples, correcting errors, and teaching the base model to understand these nuances. The benefits of fine-tuning include less complex models, requiring less computing power, and ramping up faster. Once fine-tuned, their performance on your specific need is often excellent. Just remember, specialized models require updates over time, especially for tasks like spam detection, where threats constantly evolve. However, for many educational applications, updates every six months will be sufficient.

---

**Mixture of Experts: Faster, Leaner AI**  

The world of AI is continually exploring faster and more effective models. *Mixture of Experts* 

*(MoE)* models offer a fascinating approach: massive intelligence + incredible speed. Instead of one massive brain doing everything, these models contain many specialized sub-models (experts).

New models like Meta's Llama, for example, split work among 160 highly specialized "experts", specialists in topics ranging from physics to poetry to, say, fourth-grade spelling. When you input a query, a central "router" (the brain's core architecture) decides which specific expert (or small group) to use for each part of the input. Perhaps your complex math question is routed to a numerical analysis expert, while "What's the capital of France?" requires a geography specialist. It can choose different experts for different parts. This speeds up processing significantly because only a portion of the total model parameters is used for each token (which is a unit of text).

The only catch is that the ultra-high total parameter counts are still needed physically because the MoE model architecture often requires tens or hundreds of billions of parameters to function in the first place.

---

**AI Can't Browse the Internet (Unless We Help It)**

Unless the underlying model *is* explicitly augmented, large language models fundamentally cannot search the web. Large language models are text-generation machines. Training is conducted on massive, static datasets. Think of freezing moments in the stream of the world's information. When AI appears to search the internet, it's actually using additional tools that search the web and then feed that information into the model's context.

Because AI doesn't search the web but rather makes inferences from its knowledge base, AI can sometimes make things up (we call this "hallucination"). That's why it's critical to fact-check, just like you remind your students to verify their sources.

--- 

**Understanding AI Hallucinations**

*A science teacher noticed her AI writing assistant claimed there were 12 planets in our solar system. She used this as a teaching moment about fact-checking AI outputs and understanding that these models don't actually "know" facts – they generate probable text based on patterns.*

AI models generate text based on probability distributions. They predict the next most likely word given its previous output. Odds are calculated across a vast dictionary of words learned during training. Errors can occur, especially with *foundation models*, where limits are less defined. So, if you write "The cat in the...", the model might be 90% likely to choose "hat" but 10% likely to choose other words, such as "house" or "tree."

When AI models generate incorrect or misleading information, we call this phenomenon a "hallucination". This occurs because the models do not have a built-in mechanism to verify the accuracy of their outputs. The model might generate a response that sounds confident but is actually incorrect. This is why it is important to verify the information generated by AI models, especially when using them for educational purposes.

---

**Mitigating “Hallucinations”**

Some ways you can reduce hallucinations are by:

\- Providing the AI with specific, factual information in your prompt

\- Using models augmented with web search capabilities

\- Cross-referencing important information

**Emergent Behavior in AI Models**

What if I told you that AI wasn't just following rules but could surprise us with creative sparks, almost like intuition, and that it wasn't just regurgitating facts but truly thinking?

This "emergent behaviour" happens when AI models, built on thousands of data points, start linking ideas in novel and unexpected ways. I'm sure you've seen your students do this: connecting two unrelated ideas in a way that feels intuitive. Well, AI is doing something similar on an accelerated, data-driven scale... but without the need for trial and error.

This isn't just prediction or recall. It's synthesis. AI sometimes creates patterns and insights from raw information. Recently, this has also helped us by offering fresh perspectives and even original solutions to complex problems.

**Conclusion**

By understanding how AI works, we can use it to enhance our teaching while keeping our data safe. It's like adding a new tool to your teacher toolbox—use it wisely, and it can make your job easier, more effective, and sometimes more creative 🙂
