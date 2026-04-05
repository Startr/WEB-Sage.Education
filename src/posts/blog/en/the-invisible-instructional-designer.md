---
title: "The Invisible Instructional Designer"
tags:
  - education
  - AI
  - agentic-AI
  - open-source
date: 2026-04-05T12:00:00.000-04:00
rating: 5
hero: /assets/images/heroes/painting-lacemaker.jpg
hero_alt: "A woman bent over her work, every thread deliberate, every stitch placed with practiced precision – the craft that cannot be rushed"
hero_caption: "Johannes Vermeer, 'The Lacemaker' (c. 1669-1670). Musee du Louvre, Paris. Public domain."
summary: >-
  A teacher in Liberia built an interactive climate curriculum in weeks using AI. A team in Karnataka deployed a lesson-plan agent in English and Kannada. Meanwhile, in a Facebook group with tens of thousands of members, teachers are debating whether ChatGPT can make a decent worksheet. The debate is about the artifact. The shift is about who architects the learning.
eleventyNavigation:
  parent: Blog
---

# The Invisible Instructional Designer

In the spring of 2025, a teacher in Liberia attended a series of online trainings on AI fluency. She had no prior experience with AI tools. Within weeks, she had built an interactive climate education curriculum for Liberian schools using Claude Artifacts, Anthropic's tool for generating structured, shareable content.[^1]

She did not ask Claude to make a worksheet. She asked it to help her design a curriculum: learning objectives, lesson sequences, interactive activities, and assessment rubrics, all contextualised for students in a country where climate change is not an abstraction but a daily reality of coastal erosion and shifting rainfall.

Six thousand miles east, in Karnataka, India, a team deployed Shiksha Copilot[^2] – a human-in-the-loop AI system designed to help teachers create curriculum-aligned lesson plans in English and their local language, Kannada. Between December 2024 and March 2025, grade 5 through 10 teachers used the tool to produce plans that aligned to state standards while reflecting local context, culture, and language. The system did not generate isolated worksheets. It generated lesson plans – structured, sequenced, and adapted for specific classrooms.

Neither of these teachers used the phrase "agentic AI."[^3] Neither needed to. They described what they were doing in simpler terms: the tool helped them design, not just produce.

![[painting-lacemaker.jpg]]
*Johannes Vermeer, "The Lacemaker" (c. 1669-1670). Musee du Louvre, Paris. Every thread deliberate. Every stitch placed with practiced precision. The craft that cannot be rushed. Public domain.*

## The Worksheet Debate

In early March 2026, a teacher named Peter Paccone posted in a Facebook group called AI for Teachers. The group has tens of thousands of members: classroom educators, instructional coaches, library staff. Paccone, an AP Government teacher at San Marcos High School in California, posed a provocation. Teachers Pay Teachers, the marketplace where over five million educators buy and sell lesson plans, may be approaching obsolescence.[^4] Why pay $4.99 for a static PDF when ChatGPT generates a personalised version in thirty seconds?

The responses were immediate and forceful. One elementary educator pushed back: teacher-created resources are more engaging, more accurate, more visually appealing, "especially for primary grades." Others agreed – AI outputs are "basic" and riddled with errors. The thread cited hallucinations, embedded biases, Eurocentric framing. One member questioned whether Paccone's post itself was AI-generated.[^5]

Every participant was right about something. Every participant was also debating the wrong technology.

The question in that thread ("Can a chatbot replace a TPT worksheet?") has a clear answer: sometimes, badly, with significant teacher effort to fix the output. A chatbot generates a single artifact. You type a prompt. You get a response. If the response is wrong, you prompt again. The entire burden of quality control, sequencing, and integration rests on you.

The teacher in Liberia and the team in Karnataka were not using chatbots. They were using systems that plan, build, check, and revise – systems that do what an instructional designer[^6] does, not what a photocopier does.

> **The question is no longer "can AI make a worksheet?" The question is "can AI design a unit with learning objectives, formative assessments, pacing, scaffolding, and differentiation, in the time it takes you to browse TPT?" As of 2026, the answer is yes. Not perfectly. Not without oversight. But structurally, yes.**

## What an Instructional Designer Actually Does

Most teachers have never worked with an instructional designer.[^6] Most schools cannot afford one. The role exists primarily in corporate training, higher education, and well-funded districts. An instructional designer takes a learning goal and builds the architecture around it: what should learners know, in what order should they encounter the material, how will you know they have learned it, what happens when they have not, and how does each component connect to the others.

This is not what a worksheet does. A worksheet is a single artifact. A curriculum is a system – objectives that build on each other, assessments that measure specific competencies, scaffolding that supports struggling learners without holding back advanced ones, and pacing that respects the reality of a 42-minute class period with a fire drill in the middle.

The RAND Corporation found in 2024 that teachers spend an average of seven hours per week on curriculum-related tasks outside of instruction.[^7] Much of that time is production labour: searching TPT, adapting generic materials, formatting documents, manually aligning resources to state standards. The design labour (the sequencing decisions, the assessment rationale, the differentiation strategy) happens in the teacher's head, often invisibly, often uncompensated, often in the margins of the production work.

An AI agent[^3] does not replace the design labour. It replaces the production labour that has been hiding it.

![[photo-jacquard-loom.jpg]]
*A Jacquard loom with punch cards, c. 1880. Science Museum Group Collection. The loom read patterns from punched cards. The weaver no longer placed each thread by hand. The loom did not eliminate the weaver. It eliminated the repetitive manual work that obscured the weaver's real skill: knowing which pattern to choose. Public domain.*

## The Shift Nobody Announced

Forty-five percent of curriculum specialists expect AI tools to significantly alter their roles within five years.[^8] Hiring managers now prioritise candidates who demonstrate comfort with AI-assisted workflows.[^9] In 2026, instructional designers who embed AI as part of their process are producing significantly more work (and higher-quality work) than those who do not. The market is noticing.

The shift is not speculative. It is happening in three layers.

The first layer is what Paccone's Facebook thread debated: chatbots generating individual artifacts. Worksheets, quiz questions, reading passages. This layer is real but limited. The output is often mediocre. The teacher spends as much time fixing the AI's work as they would have spent creating it from scratch. Several educators in the Facebook discussion noted this: AI saves time on the first draft, but the teacher still does the real work.[^10]

The second layer is what the Liberia teacher and the Karnataka team experienced: AI systems that handle not just generation but planning, validation, and iteration. The teacher provides a goal. The system breaks it into components, builds each one, checks them against each other, and hands back a coherent plan. The teacher reviews, modifies, and approves – but they start from a structure, not from raw materials.

The third layer is what most educators have not yet encountered: fully agentic curriculum design.[^3] A system that receives a learning goal, decomposes it into objectives aligned to Bloom's taxonomy,[^11] generates a scope and sequence, builds formative and summative assessments, creates scaffolding for diverse learners, validates internal coherence (do the assessments actually measure what the objectives claim?), and assembles the result into a structured, editable document. This is what an instructional designer does. It is also what the Sage.Education open-source curriculum agent, Downes,[^12] does.

## Downes

The agent is named after Stephen Downes, the senior research officer at the National Research Council Canada who pioneered connectivism[^13] – the idea that meaningful learning happens through actively connecting new ideas to existing understanding, forming relationships between concepts, people, and resources.

Downes is not a chatbot. It is a four-stage agentic workflow.[^14] A planning agent breaks the goal into components. An action agent builds each component. A validation agent inspects the output against the original goal, flags gaps, and identifies misalignments. A synthesis agent assembles the validated components into a coherent curriculum document.

The agent includes safety mechanisms: loop detection (it recognises when it is repeating itself), step limits (it cannot run indefinitely), and transparency features (you can inspect every step, every prompt, every decision). It works with any OpenAI-compatible model – cloud or self-hosted. The code is open-source under AGPL-3.0. The curriculum it produces belongs to the teacher.[^15]

Downes does not replace pedagogical judgment. It replaces the seven hours per week that teachers spend on production tasks – the searching, adapting, formatting, and aligning that consume time without producing learning. The sequencing decisions, the assessment rationale, the knowledge of which explanation lands with which student – that stays with the human.

> **The difference between asking a contractor to hand you a pile of lumber and asking an architect to hand you a blueprint. You still inspect the blueprint. You still make changes. But you are working from a structure, not from raw materials.**

## Who Controls the Agent

![[photo-eniac-programmers.jpg]]
*Jean Jennings (left) and Frances Bilas operating ENIAC at the University of Pennsylvania, c. 1946. U.S. Army photo. Before the machine existed, these women were the computers — mathematicians who calculated firing tables by hand. When ENIAC arrived, their real expertise turned out to be not arithmetic but logic: sequencing operations, designing branch conditions, building error-checking routines. The Army barely mentioned them. They were invisible designers. Public domain.*

There is a question beneath the technology question, and it is the one that determines whether this transition benefits teachers or merely displaces them.

When a teacher browses TPT, they control the selection. They read the reviews. They evaluate the resource. They decide whether to buy, adapt, or pass. The governance is human and distributed.

When an agent architects a curriculum, the teacher must ask new questions: who built the agent, what model it uses, where curriculum data goes, whether the platform trains on teacher materials, whether the agent's reasoning is inspectable, and whether its behaviour can be modified.

These are not technical questions. They are governance questions. They are the same questions the Luddites asked in 1811 – not whether the loom worked, but who owned it, who profited from it, and whether the workers who operated it had any voice in how it was deployed.[^16]

The Sage agent is open-source. Its code is public. Its reasoning is inspectable. It works with any model, cloud or self-hosted. It does not retain conversations or train on user data. This is a deliberate architectural choice. Not every agentic curriculum tool will make these choices. Some will be closed-source, cloud-only, data-retaining, and opaque. Some will optimise for engagement metrics rather than learning outcomes.

The architecture is the ethics. The governance is the pedagogy.

## The Thread Nobody Finished

Back in the Facebook group, the debate wound down the way these debates do: no consensus, strong feelings, the thread buried under the next day's posts. Peter Paccone's provocation, the defenses of craft, the concerns about bias and slop, the hybrid position – all of it valid, all of it partial.

What none of them said, because almost none of them had encountered the concept, is that the technology they were debating had already moved past the frame they were debating it in. A teacher in Liberia built a climate curriculum. A team in India deployed lesson planning in two languages. Teachers are gathering now in 2026 to learn to build agentic AI tools for their classrooms.[^17] The shift is not coming. It arrived while the profession was debating worksheets.

The defenders of craft were right: teacher-made resources carry a quality that generic AI output does not. The voices questioning authenticity were right: you can feel its absence. Paccone was right: the economics of static content marketplaces are under pressure.

The synthesis they did not reach is this: the future of curriculum does not have to be AI-generated content replacing teacher-made content. We wanted it to be AI handling the production infrastructure (the searching, formatting, aligning, and assembling) so the teacher can focus on the design: the sequencing, the differentiation, the assessment, the knowledge of real students in real classrooms.

The lacemaker's skill is not in the thread. It is in knowing where the thread goes. The agent handles the thread. The teachers must design the patterns.

---

[^1]: Teacher in Liberia building climate curriculum with Claude Artifacts. Reported by Anthropic and Teach For All, "Global AI training initiative," 2025. [anthropic.com](https://www.anthropic.com/news/anthropic-teach-for-all).
[^2]: Shiksha Copilot: a human-in-the-loop AI system for curriculum-aligned lesson plans, deployed in Karnataka, India (December 2024-March 2025). Supports English and Kannada. [arXiv](https://arxiv.org/html/2507.00456v2).
[^3]: **Agentic AI** refers to AI systems that can plan, execute multi-step tasks, inspect their own output, and revise autonomously – as opposed to chatbots, which respond to a single prompt with a single output. An agent receives a goal and works toward it through a loop of planning, action, and evaluation. The distinction matters because agents can architect a curriculum (a multi-step, interconnected system) while chatbots can only generate individual artifacts (a worksheet, a quiz question).
[^4]: Peter Paccone, AP Government teacher, San Marcos High School, California. Post in "AI for Teachers" Facebook group, early March 2026. Teachers Pay Teachers (founded 2006) has paid out over $1 billion to 200,000+ teacher-creators across a catalog of 7+ million resources.
[^5]: Quotes and positions drawn from the "AI for Teachers" Facebook group discussion, March 2026. Participants have been anonymised as the discussion took place in a semi-private group; permission to name individuals was not obtained. Peter Paccone is named as the original poster because his provocation was public-facing and he is a published author on education topics.
[^6]: **Instructional designer**: a professional who takes a learning goal and builds the architecture around it – objectives, sequencing, assessments, scaffolding, pacing, and differentiation. The role exists primarily in corporate training, higher education, and well-funded school districts. Most classroom teachers perform instructional design work without the title, the training, or the compensation.
[^7]: RAND Corporation, 2024 survey. Teachers spend an average of seven hours per week on curriculum-related tasks outside of instruction.
[^8]: Research.com, "AI, Automation, and the Future of Instructional Design Degree Careers" (2026). 45% of curriculum specialists expect AI to significantly alter their roles within five years. [research.com](https://research.com/advice/ai-automation-and-the-future-of-instructional-design-degree-careers).
[^9]: Devlin Peck, "How to Become an Instructional Designer in 2026." Hiring managers now prioritise AI-assisted workflow competency. Portfolios featuring AI-enabled learning experiences see stronger outcomes. [devlinpeck.com](https://www.devlinpeck.com/content/how-to-become-instructional-designer).
[^10]: Multiple educators in the "AI for Teachers" Facebook group discussion noted that AI saves time on the first draft but the teacher still does the substantive work of adaptation, correction, and contextualisation. Names anonymised.
[^11]: **Bloom's taxonomy**: a framework for classifying educational learning objectives by level of complexity, originally published by Benjamin Bloom in 1956 and revised by Anderson and Krathwohl in 2001. The six levels (from simplest to most complex): Remember, Understand, Apply, Analyze, Evaluate, Create. Instructional designers use it to ensure assessments match the cognitive level of the learning objectives.
[^12]: Downes: open-source curriculum agent built by Sage.Education. [GitHub: Sage-is/AI-Education-Downes](https://github.com/Sage-is/AI-Education-Downes). AGPL-3.0 licensed.
[^13]: **Connectivism**: a learning theory developed by Stephen Downes and George Siemens (2005) proposing that learning occurs through forming connections between nodes of information – people, concepts, resources, and systems. Unlike earlier theories that locate learning inside the individual, connectivism argues that knowledge is distributed across networks and that the capacity to make and traverse connections is itself the skill.
[^14]: The four-stage agentic workflow: (1) Planning – decompose goal into components. (2) Building – create each component. (3) Validation – inspect output against the original goal, flag gaps. (4) Assembly – bring validated components together into a coherent document. Includes safety mechanisms: loop detection, step limits, and full transparency of the agent's reasoning.
[^15]: Sage.is AI-UI, AGPL-3 licensed. [sage.is](https://sage.is). Self-hostable, model-agnostic, no data retention. Downes works with any OpenAI-compatible model (cloud or local). Curriculum produced belongs to the educator.
[^16]: The Luddites (1811-1816): skilled framework knitters in Nottinghamshire who objected not to machinery itself but to factory owners using wide-frame looms to bypass guild standards and flood the market with cheap goods. Their quarrel was with ownership and governance, not technology. Parliament responded with the Frame Breaking Act of 1812, making machine-breaking a capital offense. Fourteen Luddites were hanged at York Castle on January 16, 1813.
[^17]: EdWeek, "Teachers Move Beyond AI Basics to More Sophisticated Instructional Uses," March 2026. About 50 teachers gathered on March 18, 2026 to learn to develop agentic AI tools. [edweek.org](https://www.edweek.org/technology/teachers-move-beyond-ai-basics-to-more-sophisticated-instructional-uses/2026/03).

---

*The views expressed are those of the editorial board. Sage.is AI-UI and Sage.Education are products of Startr LLC. Full disclosure and transparency is a feature, not a bug.*
