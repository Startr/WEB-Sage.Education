---
title: "The Garden Grew Roots"
tags:
  - technology
  - education
  - AI
  - privacy
date: 2026-05-06T12:00:00.000-01:00
rating: 5
hero: /assets/images/heroes/hero-walled-garden.jpg
hero_alt: "Sunlight filtering through trees in an enclosed garden with high stone walls"
hero_caption: "Joaquin Sorolla, 'Corner of the Garden, Alcazar, Seville' (1910). J. Paul Getty Museum. Public domain."
summary: >-
  Between April 20 and 29, Google Chrome silently installed a 4 GB AI model on every device running the browser. No notification. No consent. No off switch. Sixty percent of the world's classroom devices are Chromebooks. The walled garden is no longer just the apps. It is in the hardware.
published:
  sage_blog: false
  linkedin: false
  twitter: false
  mastodon: false
  hackernews: false
  reddit: false
podcast:
  adapted: false
  episode: ""
eleventyNavigation:
  parent: Blog
---

# The Garden Grew Roots

*A companion to ["The Walled Garden."](/posts/blog/en/the-walled-garden/)*

---

On the morning of May 5, 2026, a privacy researcher named Johnny Ryan opened his browser's file system and found something that had not been there before. A file called `weights.bin`, sitting inside a directory named `OptGuideOnDeviceModel`, occupying 4 gigabytes of his hard drive. He had not downloaded it. He had not been asked. No dialog box had appeared. No notification had arrived. Google Chrome, acting through its component update system, had silently installed the weights for Gemini Nano, Google's on-device large language model, on his machine.[^1]

He deleted the file. Chrome downloaded it again.

He searched Chrome's settings for a toggle to prevent the download. There was none. The only reliable method to stop the installation permanently required an enterprise group policy — a tool designed for IT administrators managing corporate fleets, not for a person who wanted to control what software lived on their own computer.[^2]

Ryan is a senior fellow at the Irish Council for Civil Liberties and one of Europe's most prominent digital rights researchers. His reaction was not technical frustration. It was legal alarm. The EU's ePrivacy Directive, Article 5(3), requires prior informed consent before storing information on a user's device, with exceptions only for storage "strictly necessary" to provide a service the user explicitly requested.[^3] A 4 GB AI model that powers features the user never asked for, installed without notification, re-installed after deletion, with no opt-out in the browser's settings, is difficult to characterize as strictly necessary.

The backlash arrived within hours. But the story that matters is not the backlash. It is the architecture — and where that architecture sits, right now, in 38 million classrooms.

## The Number That Matters

Chromebooks account for 60.1 percent of the global K-12 device market in 2026.[^4] Thirty-eight million units are active in classrooms. Ninety-three percent of U.S. school districts plan to purchase more this year.[^5] The average education Chromebook now stays in service for 8.1 years, nearly double the lifespan of four years ago.[^6]

Every one of those devices runs Chrome. Chrome's component updater does not distinguish between a developer's workstation in Dublin and a third-grader's Chromebook in Topeka. Between April 20 and 29, the same 4 GB download rolled out to all of them.

No superintendent was notified. No school board voted. No IT director received an advisory. No parent — not the mother in Charlotte who signed the acceptable-use policy at the cafeteria table, not the father in Portland whose daughter's Chromebook sits in her backpack — was told that Google had installed an AI model on their child's device.

The model arrived through the same update channel that delivers security patches. Disabling that channel to prevent the AI download would also prevent the patches. The architecture makes it a package deal: accept the AI or lose the security updates. For a school district managing thousands of devices, this is not a choice. It is a constraint disguised as a feature.

> **The garden was always the apps. Now the garden is in the hardware. The wall did not get higher. It grew roots.**

## What Changed Between March and May

In ["The Walled Garden,"](/posts/blog/en/the-walled-garden/) published in March 2026, we documented Google's education lock-in at the software layer. NotebookLM generates mind maps that cannot be edited, in formats that cannot be exported. Gemini sits inside Docs, Sheets, Slides, and Classroom, producing outputs that are maximally useful inside Google's ecosystem and minimally portable outside it. The bundling pattern — free tool, integration, embedded AI — makes the switching cost not a price but a topology.

The walled garden was software. The devices were vessels — neutral hardware that ran whatever Google's services required, but did not themselves carry AI capabilities the school had not requested.

Chrome Nano changed that. The AI is no longer a cloud service accessed through a browser. It is a 4 GB model file installed on the device itself, in the user's profile directory, through an update system the user does not control. The distinction matters architecturally. A cloud service can be blocked at the network level — a school firewall can deny access to a specific Google endpoint. A model installed on the device's hard drive is behind the firewall. It is already inside.

ConductAtlas, a compliance research firm, analyzed Chrome's Terms of Service in the days following the disclosure. Their conclusion: Chrome's terms authorize automatic software updates to the browser, but "four gigabytes of AI model weights that power features the user never requested is a different category, and the terms do not explicitly address it."[^7]

Google's education-specific Admin Console does offer controls. Chrome Enterprise policies allow administrators to set `OnDeviceModelEnabled` to `false`, which prevents the download on managed devices.[^8] But this setting must be actively discovered, actively configured, and actively maintained across every policy update. The default is installation. The opt-out is enterprise tooling. For the majority of school districts — particularly small and rural districts without dedicated IT staff — the default is the reality.

> **The default is installation. The alternative is a group policy setting that most school IT directors have never heard of.**

## The Prompt API: When Websites Install AI

The 4 GB download is not the end of the story. It is the foundation for what comes next.

Chrome 148, releasing in Q2 2026, enables the Prompt API by default.[^9] The Prompt API is a JavaScript interface that allows any website to access Gemini Nano directly, in the browser, on the device. A web developer building a homework help site, a quiz platform, or an educational game can call `LanguageModel.create()` in JavaScript, and if the model is not already present on the device, Chrome will download it — triggered not by a browser update, but by visiting a webpage.[^10]

The download is between 2.7 and 4.0 GB. It happens when the user visits a page that calls the API. No separate consent dialog is required beyond the browser's existing permissions model. The API documentation instructs developers to "check for user activation" and "inform the user" about the download, but these are developer guidelines, not enforced constraints.[^11]

Consider the implications for a school district. A student visits a website for a class assignment. The website calls the Prompt API. Chrome begins downloading gigabytes of AI model weights to the student's Chromebook. The student did not consent. The teacher did not know. The IT director did not authorize the website to install software on the school's hardware. The parent who signed the acceptable-use policy at back-to-school night — the form that named no platforms, described no data practices, and mentioned no AI — certainly did not envision this.

The Walled Garden documented how Google controls the software layer of education. Chrome Nano documented how Google modified the hardware layer without consent. The Prompt API completes the pattern: it allows third-party websites to trigger AI installations on school devices through Google's infrastructure, with Google's model, governed by Google's terms.

> **First, Google embedded AI in its apps. Then it installed AI on its devices. Next, it lets anyone's website install AI through its browser. The surface area grows. The consent stays the same: none.**

## The Environmental Arithmetic

At the scale of Chrome's install base, the silent download is not merely a privacy event. It is an environmental one.

Johnny Ryan, the researcher who first documented the installation, calculated the carbon footprint. A single global push of 4 GB to Chrome's 2-billion-plus installations generates between 6,000 and 60,000 tonnes of CO2-equivalent emissions, depending on the energy mix of the data centers and networks involved.[^12] For context, 60,000 tonnes is roughly the annual carbon output of 13,000 passenger cars.

Google's own published data shows that a typical Gemini text query uses 0.24 watt-hours of energy.[^13] The energy figure is small per prompt. At the scale of billions of devices running on-device inference — triggered by any website, through any page visit, on hardware the user did not choose to equip with AI — the aggregate is not small.

Schools, already navigating constrained budgets for electricity and device replacement, absorbed 4 GB of network bandwidth per device without warning. A district running 5,000 Chromebooks consumed roughly 20 terabytes of unplanned bandwidth. Districts in rural areas with metered internet connections paid for data they did not request.

## The Consent Architecture

The pattern is familiar because it is always the same pattern.

In ["The Waiver Nobody Read,"](/resources/the-waiver-nobody-read/) we documented how edtech vendors outsource COPPA compliance to schools, and schools outsource consent to a blanket acceptable-use policy that names no platforms and describes no data practices. The FTC called this arrangement illegal in 2023. The architecture has not changed.

Chrome Nano adds a layer. The acceptable-use policy that a parent signs at registration does not mention Google Chrome installing AI models on the device. It does not mention the Prompt API allowing websites to trigger multi-gigabyte downloads. It does not mention that the only way to prevent these installations is an enterprise group policy that requires technical expertise most school districts do not possess.

The parent consented to "digital learning tools." Google interpreted that as permission to modify the hardware.

In ["The Prompt You Thought Was Private,"](/resources/the-prompt-you-thought-was-private/) we documented how tracking scripts in AI tools transmit prompt content to advertising networks without the user's knowledge. Chrome Nano operates through the same logic of assumed consent: the user accepted Chrome's Terms of Service, the Terms authorize updates, the update included an AI model, therefore the user consented to the AI model. Each step is technically defensible. The chain as a whole is a consent architecture designed so that inaction equals agreement.

> **Chrome's Terms of Service authorize browser updates. Google decided that "browser update" includes installing a 4 GB AI model. The user who accepted the terms in 2019 has now consented, retroactively, to a technology that did not exist when they clicked "I agree."**

## What IT Directors Can Do Right Now

The enterprise policy exists. It works. It is the only reliable mechanism.

**Step 1: Set the enterprise policy.** In the Google Admin Console, navigate to Chrome Management and set `OnDeviceModelEnabled` to `Disabled` for all managed Chromebooks and Chrome browsers. This prevents the Gemini Nano download on managed devices and survives Chrome updates.[^14]

**Step 2: Audit the fleet.** Check for existing `weights.bin` files in user profile directories under `OptGuideOnDeviceModel`. On devices where the model has already been installed, deleting the file without setting the policy will result in re-download.

**Step 3: Monitor Chrome flags.** The flag `chrome://flags/#optimization-guide-on-device-model` controls the download on unmanaged devices. For managed fleets, the enterprise policy takes precedence, but the flag is useful for testing and for devices not yet enrolled in management.

**Step 4: Review Prompt API exposure.** When Chrome 148 arrives, assess whether the Prompt API should be disabled for student devices. The API allows any website to invoke on-device AI inference and, if the model is not present, to trigger its download.

**Step 5: Notify parents.** The acceptable-use policy that parents signed does not cover this. A brief notification — "Google Chrome recently installed a 4 GB AI model on school-managed Chromebooks. We have disabled this feature." — is not legally required in most jurisdictions. It is the right thing to do.

These steps are necessary. They are not sufficient. They address the symptom — a specific model installed by a specific update — without addressing the architecture that made the installation possible. Chrome's component updater will push the next component, for the next feature, through the same channel. The enterprise policy that blocks today's AI model may not apply to tomorrow's.

## The Architecture That Does Not Ask

The Walled Garden described a garden with a gate that was never locked — just designed so that staying felt easier than leaving. The gate is still unlocked. But the garden has changed.

Google is no longer only controlling the software that students use inside the browser. It is modifying the hardware that students carry in their backpacks. The AI model that arrived on 38 million classroom Chromebooks between April 20 and 29 was not requested by any school, approved by any board, or disclosed to any parent. It arrived because Google's update architecture treats a 4 GB AI installation the same way it treats a security patch: as something the user has already consented to by using the browser.

The schools that built their own AI infrastructure — the University of Missouri with Show-Me AI, The Study in Westmount with Rosie, the growing number of institutions running self-hosted platforms on their own terms — did not receive an uninvited AI model on their devices. They chose what to install. They chose when. They chose whether. The sovereignty was not a philosophical position. It was a practical one: when you own the infrastructure, nobody else decides what runs on it.

For the 60 percent of classrooms running Chromebooks, that choice was never offered. The model arrived. The default was installation. The alternative required enterprise tooling. The consent was assumed.

The garden grew roots. They are in the device now. And the only question left is the same question it has always been: who decides what grows in the soil your students stand on?

---

*This article is a companion to ["The Walled Garden,"](/posts/blog/en/the-walled-garden/) published March 2026, which documented Google's education software lock-in. The views expressed are those of the editorial board. Full disclosure and transparency is a feature, not a bug.*

---

[^1]: Johnny Ryan, senior fellow, Irish Council for Civil Liberties. Documented Chrome's silent Gemini Nano installation, May 2026. [That Privacy Guy](https://www.thatprivacyguy.com/blog/chrome-silent-nano-install/).
[^2]: Enterprise policy `OnDeviceModelEnabled` set to `false` via Group Policy (Windows) or managed preference profile (macOS/ChromeOS). The only persistent mechanism to prevent download. [Make Tech Easier](https://maketecheasier.com/stop-chrome-auto-download-gemini-nano-windows/).
[^3]: EU ePrivacy Directive (Directive 2002/58/EC), Article 5(3): requires prior informed consent before storing information on a user's device, with exceptions only for storage strictly necessary to provide a service the user explicitly requested. [byteiota analysis](https://byteiota.com/chrome-installs-4gb-ai-without-consent-eu-violation/).
[^4]: Education Sector Chromebook Adoption Statistics 2026. [About Chromebooks](https://www.aboutchromebooks.com/education-sector-chromebook-adoption-statistics).
[^5]: CoSN (Consortium for School Networking), "2025-2026 K-12 IT Leadership Survey," Chromebook procurement data.
[^6]: Education-sector Chromebook average lifespan: 8.1 years in 2026, up from approximately 4 years pre-2024. [About Chromebooks](https://www.aboutchromebooks.com/education-sector-chromebook-adoption-statistics).
[^7]: ConductAtlas, "Chrome Downloaded 4GB of AI to Your Machine. Here Is What Google's Own Policies Say About It," May 2026. [ConductAtlas](https://conductatlas.com/blog/google-chrome-silent-gemini-nano-install-2026/).
[^8]: Google Admin Console, Chrome Management policies. `OnDeviceModelEnabled` policy controls Gemini Nano download on managed devices. [Chromium policy documentation](https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/c/t6fqOnTzA_g).
[^9]: Chrome 148 beta release notes. Prompt API enabled by default. [Chrome for Developers](https://developer.chrome.com/blog/chrome-148-beta).
[^10]: The Prompt API, Chrome for Developers. `LanguageModel.create()` triggers model download if not present. [Chrome Prompt API docs](https://developer.chrome.com/docs/ai/prompt-api).
[^11]: Chrome Built-in AI documentation. Developer guidelines recommend checking user activation and informing users of download. These are not enforced constraints. [Chrome Built-in AI](https://developer.chrome.com/docs/ai/built-in).
[^12]: Carbon footprint estimate: 6,000-60,000 tonnes CO2-equivalent for a single global push of 4 GB to Chrome's 2B+ installations. [That Privacy Guy](https://www.thatprivacyguy.com/blog/chrome-silent-nano-install/).
[^13]: Google AI energy data: typical Gemini text query uses 0.24 Wh of energy. [MIT Technology Review](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/).
[^14]: Step-by-step: Google Admin Console > Devices > Chrome > Settings > Content > On Device Model > Disabled. Applies to all managed devices in the organizational unit.

---

## Working Titles

1. **"The Garden Grew Roots"** — Extends the Walled Garden metaphor: the lock-in moved from apps to hardware. The garden is no longer just the software around you. It is in the device beneath you.

2. **"Four Gigabytes You Didn't Ask For"** — Plain, direct, the number is the hook. Centers the consent violation. Reads as a headline that makes an administrator stop scrolling.

3. **"The Uninvited Guest"** — Literary. Something arrived on your device, in your school, on your students' hardware, without being invited. It refuses to leave when asked. It comes back when removed.
