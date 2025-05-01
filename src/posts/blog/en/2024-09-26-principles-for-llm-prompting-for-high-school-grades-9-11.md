---
layout: layouts/blog.njk
title: Principles for LLM Prompting for High Schoolers (Grades 9-11)
tags:
  - "#student"
  - "#high-school"
  - AI
  - prompting
date: 2024-09-26T11:58:00.000Z
rating: 5
summary: Imagine you're stuck on a history homework question. Instead of asking,
  "Tell me about World War II," you ask, "What were the causes of World War II?"
  Suddenly, the AI gives you clear, detailed answers that help you ace your
  assignment. This guide teaches you how to craft such precise prompts, turning
  AI into your study buddy. Ready to transform your learning experience? Learn
  more
---
While we often think of AI as a single entity, the reality is that what powers today's AI tools are large language models (LLMs). These advanced systems are trained on vast amounts of data. Think of LLMs as condensed versions of the internet's knowledge, distilled into structures that can help us generate new ideas and insights.

At the heart of using MLLs effectively is the "prompt". The prompt is the input you provide to the model. How you phrase your prompt highly depends on the output you will get. Suppose your prompt is vague or lacks detail. In that case, the AI's response will likely miss the mark, delivering irrelevant or unsatisfactory results. For example, asking, "What can you tell me about history?" will likely yield a broad, unfocused response. However, refining the question to "What were the causes of World War II?" will return a much more targeted and insightful answer.

This is why clear communication is key when working with LLMs. The clearer and more specific your questions are, the more useful and accurate the AI's responses will be. Learning to develop the ability to phrase precise prompts can turn AI into a powerful ally. Moreover, learning to ask good questions isn't just useful for working with AI, it's a fundamental communication skill that will benefit you across all aspects of life.

This guide offers straightforward tips, called "Prompt Principles", to help you communicate more effectively with AI tools. These principles are easy to understand and use, and can make learning more interesting and fun by using AI to spark new ideas and deepen your understanding of what you're learning in class.

### Prompt Principles for High Schoolers

### 1. Break Down Complex Tasks

Instead of asking for a broad answer, break the question into smaller, more specific parts to make it easier for the LLM to respond.

Weak Prompt:

* "Explain how governments work."

Why it's weak: This prompt is too broad and doesn't guide the LLM on which aspect of government (or which style of government) to focus on, leading to an unfocused answer.

Improved Prompt:

* "Please explain how Canadian laws are made by the government, starting with how a bill becomes a law."

How it's improved: The improved version narrows the focus to a specific part of the Canadian government (law-making), making it a more specific task.

### 2. Explain Concepts in Simple Terms

Ask the LLM to explain a complex topic in a way that's easy to understand by specifying the difficulty level.

Weak Prompt:

* "Explain quantum physics."

Why it's weak: This prompt is too general and doesn't specify the difficulty level, which may result in a too advanced or vague response.

Improved Prompt:

* "Explain the basic idea of quantum physics as if I'm just starting to learn it as a beginner."

How it's improved: The revised prompt clearly states that the explanation should be simplified, helping the LLM tailor its response to a beginner level.

### 3. Use Affirmative Language

Use clear, positive instructions about what you want the model to do rather than focusing on what it shouldn't do.

Weak Prompt:

* "Don't give me an unclear answer."

Why it's weak: Focusing on what *not* to do is unhelpful for an AI. The model might still give a vague answer, as it's unclear what is expected. 

Improved Prompt:

* "Give me a clear, detailed answer about how renewable energy works."

How it's improved: The improved prompt focuses on what you *want:* a clear and detailed explanation. This makes it easier for the LLM to meet expectations. 

\*\** Negative Prompts are okay to use. They are instructions that help clear unwanted elements in generated content.  They differ from affirmative prompts in that they tell AI models what to include and, importantly, what to leave out. They retain clarity and can be very helpful. 

For example, the instruction to exclude clichés and common tropes will encourage the LLM to produce more original and creative writing.

### 4. Role-Play Prompts

Ask the LLM to take on a specific role (e.g., teacher, historian) to help deliver more tailored, context-specific responses.

Weak Prompt:

* "Tell me about history like you're talking to an alien."

Why it's weak: Asking the model to explain to an alien can confuse the tone and level of the response.

Improved Prompt:

* "Pretend you are a historian. Explain the causes of World War I to someone who is learning it for the first time."

How it's improved: The improved prompt uses a relatable role (a historian) and asks for an explanation in a clear and accessible way.

### 5. Use Boundaries (Delimiters)

Set clear boundaries or limits in your prompt. Setting a word count or specifying what needs to be summarized will help guide the model's response.

Weak Prompt:

* "Use this passage to give me a short summary explanation of climate change."

Why it's weak: "Short" is too vague; the model might not know how brief the answer should be.

Improved Prompt:

* "Please give me a two-sentence summary explanation of climate change from the following passage: 
* "\[The text passage]"

How it's improved: Setting a specific word limit clearly outlines the expectations, allowing the LLM to provide a concise but informative answer.

### 6. Use Structured Words and Phrases

Ask the LLM to explain a process or concept step-by-step to get a clear and structured explanation.

Weak Prompt:

* "Explain how to write an argumentative essay."

Why it's weak: The instruction is too broad and may result in a general or unclear response.

Improved Prompt:

* "Explain step-by-step how to write an argumentative essay, starting with choosing a topic."

How it's improved: The improved prompt asks for a structured, step-by-step breakdown of the process. This leads to a more detailed and helpful response.

### 7. Ask for Examples

To make abstract concepts easier to understand, ask for specific examples as part of your response.

Weak Prompt:

* "Explain Newton's laws of motion."

Why it's weak: While the model might explain the laws, it might still be too abstract for the student to grasp without an example.

Improved Prompt:

* "Explain Newton's first law of motion and give an example of how it works in real life."

How it's improved: Requesting a real-life example makes the explanation more tangible and easier to understand.

### 8. Ask for Clarity

If an explanation is unclear, ask the LLM to clarify a specific part rather than asking for a full repeat of the explanation.

Weak Prompt:

* "I didn't get that. Can you explain it again?"

Why it's weak: It doesn't indicate which part was unclear, so the model might repeat the same explanation without improvement.

Improved Prompt:

* "Can you explain the difference between speed and velocity more clearly?"

How it's improved: The improved prompt focuses on the specific concept that needs to be clarified, making it easier for the LLM to refine its answer.

### 9. Request Multiple Options

Ask for multiple responses or suggestions to provide variety and allow you to choose the best option.

Weak Prompt:

* "Give me a title for my essay."

Why it's weak: This prompt asks for just one suggestion, which might not be what the student wants.

Improved Prompt:

* "Give me three different titles for my essay on climate change."

How it's improved: Asking for multiple options gives you a range of choices, allowing you to pick the one you like best.

### 10. Combine Chain-of-Thought (CoT) with Few-Shot Prompts

Guide the model in solving problems step-by-step (chain-of-thought) and ask it to provide an example to help structure the response.

Weak Prompt:

* "How do I solve this math problem: 5x + 2 = 12?"

Why it's weak: It may give a direct answer but won't show the reasoning or steps needed to solve the problem.

Improved Prompt:

* "Can you explain how to solve this equation step by step: 5x + 2 = 12? 
* Start by explaining how to isolate x."

How it's improved: The improved version asks for a step-by-step explanation (chain-of-thought) and focuses on one part of the solution at a time, encouraging the LLM to show the thinking process.

### 11. Ask for a Detailed Response

Request a detailed answer when you need a deeper explanation or a more comprehensive understanding of a topic.

Weak Prompt:

* "Tell me about the French Revolution."

Why it's weak: It might lead to a short, surface-level response that doesn't provide enough depth for a high school student.

Improved Prompt:

* "Give me a detailed explanation of the causes of the French Revolution, focusing on economic and social factors."

How it's improved: The LLM can provide a richer, more in-depth answer by specifying "detailed" and focusing on particular factors.

### 12. Use Output Primers

Start your prompt with part of the desired response or output, guiding the LLM to continue in a consistent way.

Weak Prompt:

* "Finish my story."

Why it's weak: It's too vague, and the model might struggle to keep the tone or structure of the story consistent.

Improved Prompt:

* "Here's the start of my story: 'The storm was getting worse, and Mia knew she had to act fast. She grabbed her bag and…' 
* Help me finish the story, keeping the tone suspenseful"

How it's improved: This version gives a clear starting point and sets expectations for the tone. This ensures that the model finishes the story in a way that matches your intention.

## Conclusion

Learning to communicate with AI is not just about technology - it's really about asking the questions in the right way. By understanding and applying these easy to use "Prompt Principles," you'll learn how to ask better questions that lead to better answeres, new ideas and deeper understanding.
