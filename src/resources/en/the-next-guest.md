---
title: "The Next Guest"
tags:
  - technology
  - education
  - AI
  - privacy
date: 2026-05-08T12:00:00.000-01:00
rating: 5
hero: /assets/images/heroes/hero-next-guest-classroom.jpg
hero_alt: "Students learning at computers in a classroom, the devices connecting them to systems they do not control"
hero_caption: "Photo: Sathya Narayanan Subramanian. CC BY-SA 3.0, via Wikimedia Commons."
summary: >-
  Chrome 148 lets any website trigger a multi-gigabyte AI download onto a student's device via JavaScript. No consent dialog. No IT authorization. Schools that built their own AI infrastructure never received the uninvited guest. The rest are waiting for the next one.
eleventyNavigation:
  parent: Blog
---

# The Next Guest

*Part 3 of 3. Follows ["The Consent That Was Never Given."](/resources/the-consent-that-was-never-given/)*

On a Tuesday morning in a fourth-grade classroom somewhere in the United States, a student opens a Chromebook and navigates to a website the teacher assigned for a math exercise. The website is legitimate. The teacher vetted it. The district approved it. The website calls a single JavaScript[^1] function: `LanguageModel.create()`. Chrome begins downloading gigabytes of AI model weights to the student's device.

The student did not consent. The teacher did not know the website used the API. The IT director did not authorize the website to install software on the district's hardware. The parent who signed the acceptable-use policy did not envision this scenario, because the technology did not even exist when the form was printed.

This is not a hypothetical situation. This is Chrome 148.

## The Door That Stays Open

The 4 GB Gemini Nano model that Google silently installed on every Chrome device between April 20 and 29, 2026 was not the end of the story. It was the foundation for what is to come next.[^2]

Chrome 148, scheduled for Q2 2026, enables the Prompt API by default.[^3] This JavaScript interface gives ***any website direct access to Gemini Nano running locally*** on the device. A web developer building a homework platform, a quiz tool, or an educational game can invoke on-device AI inference with a few lines of code. If the model weights are not already present, Chrome downloads them, triggered not by a browser update but by visiting a webpage.[^4]

The download is between 2.7 and 4.0 GB. The API documentation instructs developers to "check for user activation" and "inform the user," but these are guidelines, not enforced constraints. No separate consent dialog is required beyond the browser's existing permissions model.[^5]

["The Walled Garden"](/resources/the-walled-garden/) documented how Google controls the software layer of education technology. ["The Uninvited Guest"](/resources/the-uninvited-guest/) documented how Google modified the hardware layer without consent. The Prompt API completes the circuit: it allows any third party's website to trigger AI installations on school devices, through Google's infrastructure, using Google's model, governed by Google's terms.

> **First, Google embedded AI in search and its apps. Then it installed AI on its devices. Now it lets any website install AI through its browser. The surface area expands. The consent remains the same: none.**

## The Backlash That Misses the Point

The Fortune headline landed three weeks before Chrome Nano, on April 10, 2026: "Schools across America are quietly admitting that screens in classrooms made students worse off and are reversing years of tech-first policies."[^6] The article documented McPherson Middle School in central Kansas, where 480 students gave up their school-issued Chromebooks in December 2025. The principal found that without phones, students had simply migrated their distractions to the school laptops. The unused devices now sit in carts at the back of classrooms while children take notes with pens.

Robert Taylor, superintendent of Wake County, North Carolina's largest school system, told a 2025 committee meeting that the district needed to "move away from its one-to-one laptop policy."[^7] By 2024, the United States had spent more than $30 billion putting screens in classrooms. Gen Z, the generation that grew up with those screens, is the first generation to score lower than its predecessors on standardized cognitive assessments.[^8]


![[photo-empty-classroom.jpg]]
*An empty classroom in Orbe, Switzerland. Some districts are putting Chromebooks back on carts and handing students pens. The question Chrome Nano raises is different: even if the devices stay, who decides what runs on them? Photo: CC BY-SA 4.0, via Wikimedia Commons.*

 The districts reconsidering screens are making a pedagogical argument: that the devices may cause more harm than good. Chrome Nano makes a different argument, one that applies whether or not you believe screens help learning. Even if a school decides that Chromebooks belong in the classroom, even if the pedagogical case is sound, even if every parent consents to the device itself, the question remains: *who decides what software runs on it?*
 
Google answered that question between April 20 and 29. The school did not decide. The IT director did not decide. The teacher, the parent, and the student did not decide. Google decided, and the component updater delivered.

## What IT Directors Can Do This Week

Google's Admin Console does provide a mechanism. The enterprise policy `OnDeviceModelEnabled`, set to `Disabled` under Chrome Management, prevents the Gemini Nano download on managed devices and survives Chrome updates.[^9] It works. It is the only reliable method.

Discoverability is the gap: the policy must be actively found, actively configured, and actively maintained across every Chrome update. The default is installation. The alternative requires enterprise tooling that many districts do not know exists. For small and rural districts without dedicated IT staff, the default is the reality.

Here are five steps, in order:

1. Set the enterprise policy. Navigate to Chrome Management in the Google Admin Console. Set `OnDeviceModelEnabled` to `Disabled` for all organizational units containing student and staff Chromebooks.

2. Audit the fleet. Check for existing `weights.bin` files in user profile directories under `OptGuideOnDeviceModel`. On devices where the model is already installed, deleting the file without first setting the policy will trigger a re-download.

3. Monitor Chrome 148. When it arrives, assess whether the Prompt API should be disabled for student devices. The API allows any website to invoke on-device AI inference and, if the model is not present, to trigger its download.

4. Review the acceptable-use policy. The document parents signed does not cover AI model installations delivered through browser updates. A brief, factual notification to families is not legally required in most jurisdictions. ***It is the right thing to do though.***

5. Document the decision. Whether the district enables or disables the model, the choice should be recorded, dated, and attributed. If a regulator or a parent asks later, the answer should not be "we did not know."

## The Architecture That Does Not Ask

The schools that built their own AI infrastructure never received the uninvited guest.

The University of Missouri's Show-Me AI initiative, launched in September 2025 under CIO Chris Kwak, runs entirely on university-owned servers.[^10] The Study, a school in Westmount, Montreal, built the first Canadian private school's AI agent named Rosie on sovereign infrastructure, in partnership with Sage.Education, specifically so that no third party could decide what ran on their devices.[^11] The growing number of institutions deploying open-source, self-hosted AI platforms chose what to install. They chose when. They chose whether.

Sage.is AI-UI is built on this architecture: AGPL-3 licensed,[^12] self-hostable, model-agnostic.[^13] No component updater reaches into the school's devices to install software the administration did not request. No JavaScript API lets a third-party website trigger downloads onto the school's hardware. The platform connects to whatever models the institution chooses, on infrastructure the institution controls, governed by policies the institution writes. Sovereignty is not a philosophical position. It is the difference between a school that decides what runs on its devices and a school that finds out afterward.[^14] 


![[photo-open-garden.jpg]]
*An iron gate to a winding path at Vibble, Gotland, Sweden. The schools that built their own AI infrastructure own the gate. The rest discovered someone else had already walked through it. Photo: CC BY-SA 4.0, via Wikimedia Commons.*

For the 60 percent of classrooms running Chromebooks, the choice was never offered. The model arrived. The default was installation. The alternative required enterprise tooling. The consent was assumed.

Somewhere on a Tuesday morning, in a fourth-grade classroom, a student is opening a Chromebook. The teacher assigned a website. The website calls the Prompt API. Chrome begins downloading. The next guest does not knock either.

---

*This article is Part 3 of  ["The Uninvited Guest"](/resources/the-uninvited-guest/) series, and a companion to ["The Walled Garden,"](/resources/the-walled-garden/) published March 2026. The views expressed are those of the editorial board. Full disclosure and transparency is a feature, not a bug.*

---

## Footnotes

[^1]: **JavaScript** is the programming language that powers interactive features on nearly every website. When a website runs JavaScript code in your browser, that code executes on your device. The Prompt API allows JavaScript to trigger AI model downloads and run AI inference locally, meaning a website's code can now install and operate a 4 GB AI model on a visitor's machine.

[^2]: For the full account of how Google Chrome silently installed Gemini Nano on every device running the browser between April 20 and 29, 2026, see Part 1: ["The Uninvited Guest."](/resources/the-uninvited-guest/)

[^3]: Chrome 148 beta release notes. Prompt API enabled by default; adds `temperature` and `topK` sampling parameters for on-device inference. [Chrome for Developers](https://developer.chrome.com/blog/chrome-148-beta).

[^4]: **Prompt API**: a JavaScript interface that gives web developers access to Gemini Nano running locally in the browser. Calling `LanguageModel.create()` triggers the model download if weights are not already present. The API supports text, image, and audio inputs and can constrain outputs to predefined JSON schemas. [Chrome Prompt API documentation](https://developer.chrome.com/docs/ai/prompt-api).

[^5]: Chrome Built-in AI documentation. Developer guidelines recommend checking user activation and informing users about the download, but these are recommendations, not enforced constraints. No separate consent dialog is required. [Chrome Built-in AI overview](https://developer.chrome.com/docs/ai/built-in).

[^6]: "Schools across America are quietly admitting that screens in classrooms made students worse off and are reversing years of tech-first policies." Fortune, April 10, 2026. [fortune.com](https://fortune.com/2026/04/10/america-schools-public-schools-edtech-google-chromebooks-education/).

[^7]: Robert Taylor, superintendent of Wake County Public Schools, North Carolina. Wake County is the state's largest school system. Statement made at a 2025 committee meeting regarding the district's one-to-one laptop policy. Reported by Fortune, April 2026.

[^8]: Jared Cooney Horvath, neuroscientist and educator, testified before the U.S. Senate Committee on Commerce, Science, and Transportation in early 2026 that Gen Z is the first generation in modern history to score lower on standardized cognitive tests than the previous one. Horvath cited Program for International Student Assessment (PISA) data from 15-year-olds across approximately 80 countries, finding that once countries adopt digital technology widely in schools, performance declines significantly. Students using computers approximately five hours per day for learning score over two-thirds of a standard deviation lower than students who rarely use technology in school. [Fortune](https://fortune.com/2026/02/21/laptops-tablets-schools-gen-z-less-cognitively-capable-parents-first-time-cellphone-bans-standardized-test-scores/). [LinkedIn (Horvath's own post)](https://www.linkedin.com/posts/jared-cooney-horvath_i-told-the-senate-gen-z-is-less-cognately-activity-7425345825612017664-1A5y).

[^9]: Google Admin Console, Chrome Management. `OnDeviceModelEnabled` policy controls Gemini Nano download on managed devices. Must be set to `Disabled` at the organizational unit level. [Chromium discussion group](https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/c/t6fqOnTzA_g).

[^10]: University of Missouri, "Show-Me AI" initiative, launched September 2025. Chris Kwak, Chief Information Officer, oversaw deployment on university-owned infrastructure. Referenced in "The Walled Garden."

[^11]: The Study, Westmount, Montreal. Built a sovereign AI agent ("Rosie") on school-owned infrastructure in partnership with Sage.is. Referenced in the "Don't Panic" series. Students build on Rosie's foundation using tools they choose: Claude Code, OpenAI Codex, Lovable, or models running locally.

[^12]: **AGPL-3 (GNU Affero General Public License, version 3)** is an open-source software license that guarantees the right to inspect, modify, and redistribute the source code. Unlike proprietary licenses, AGPL-3 ensures that the software cannot be made closed-source by any party, including the original developer. For schools, this means the platform's code is permanently auditable and the institution cannot be locked into a vendor's ecosystem.

[^13]: **Model-agnostic** means the platform is not tied to any single AI provider. A model-agnostic system can connect to models from Google, Anthropic, OpenAI, Meta, Mistral, or any other provider, including models the institution runs on its own hardware. This prevents the vendor lock-in that occurs when a platform only works with one company's AI.

[^14]: Sage.is AI-UI. AGPL-3 licensed, self-hostable, model-agnostic.

---

*Sage.is AI-UI and Sage.Education are products of Startr LLC; their inclusion represents a disclosure of interest. No individuals quoted in this article were interviewed; all quotes are from published sources. Full disclosure and transparency is a feature, not a bug.*
