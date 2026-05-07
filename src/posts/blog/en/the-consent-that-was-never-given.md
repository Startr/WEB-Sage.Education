---
title: "The Consent That Was Never Given"
tags:
  - technology
  - education
  - AI
  - privacy
date: 2026-05-07T12:00:00.000-01:00
rating: 5
hero: /assets/images/heroes/hero-consent-cafeteria.jpg
hero_alt: "A school cafeteria with long tables under fluorescent lights, the kind of room where eleven forms get signed in nine minutes"
hero_caption: "Photo: David Shankbone. CC BY-SA 3.0, via Wikimedia Commons."
summary: >-
  Google installed a 4 GB AI model on 38 million classroom Chromebooks. The acceptable-use policy parents signed at back-to-school night named no platforms, described no data practices, and mentioned no AI. The consent architecture is always the same. The vendor points to the school. The school points to the form. The form points to nothing.
eleventyNavigation:
  parent: Blog
---

# Consent Was Never Given

*Part 2 of 3. Follows ["The Uninvited Guest."](/posts/blog/en/the-uninvited-guest/)*

You might have heard this all before.  One Tuesday last August, in a cafeteria outside Charlotte, North Carolina, a mother of two signed eleven forms in nine minutes. One was an emergency contact card. One was a lunch application. One was an acceptable-use policy that authorized the school district to provide students with access to "digital learning tools." The form named no platforms. It described no data practices. It mentioned no AI. The mother does not remember signing it, because there was nothing to remember. Her seven-year-old was asking for the third time whether they could go see the classroom.[^1]

Her signature now appears in the compliance records of at least four educational technology companies she has never heard of. By May of this year, it also served as the implied basis for Google to install an AI on her daughter's school-issued Chromebook. The form did not mention Google Chrome's component updater. It did not mention Gemini Nano. It did not mention that the 4GB AI re-downloads every time it's deleted.

The parent consented to "digital learning tools." Google interpreted that consent as permission to modify the hardware.

## The Same Architecture, Again

The consent architecture is familiar because it is always the same architecture.

In ["The Waiver Nobody Read,"](/resources/the-waiver-nobody-read/) our series documented how edtech vendors outsource COPPA[^2] compliance to schools, and schools outsource consent to a blanket acceptable-use policy that names no specific platforms. The vendor points to the school. The school points to the form. The form points to nothing. The FTC called this arrangement illegal in 2023, in a six-million-dollar enforcement action against Edmodo.[^3] The architecture has not changed.

### Google's Gemini Nano adds a new layer. 

The acceptable-use policy does not mention Google installing AI on devices. It does not mention that disabling the AI update also stops all security updates. It does not mention the Prompt API,[^4] which will soon let any website trigger the other AI downloads without user consent.

Leonie Haimson, executive director of Class Size Matters and co-chair of the Parent Coalition for Student Privacy, has tracked Google's education data practices since 2015, filing FTC complaints in 2015 and 2021. In early May 2026, Haimson joined a coalition of advocacy groups calling for an AI moratorium in New York City public schools, citing what she described as "sloppy, irresponsible" data privacy practices that "show a lack of concern for keeping students' personal information safe from breach and misuse."[^5] The coalition's concern was about AI tools the district had chosen to deploy. Chrome Nano is something different: AI that arrived without the district being given a choice at all.

> **The vendor points to the school. The school points to the form. The form points to nothing. And the AI arrived on the device before anyone in the chain knew it was coming.**

## From Software to Soil

In ["The Walled Garden,"](/posts/blog/en/the-walled-garden/) published in March 2026, this series documented Google's education lock-in at the software layer. NotebookLM generates mind maps that cannot be edited, in formats that cannot be exported, outside of downloading as an image. Gemini sits inside Docs, Sheets, Slides, and Classroom. The bundling pattern follows three stages: offer a free tool that solves a real problem, integrate it with everything else, then embed AI that makes the data maximally useful inside the ecosystem and minimally portable outside it.

The walled garden was software. The devices were vessels. Neutral hardware that ran whatever Google's services required, but that did not themselves carry AI capabilities the school had not chosen.

![[photo-vine-wall.jpg]]
*Vine growing through a stone wall at Greys Court, Henley-on-Thames. The garden was always the software. Now the roots are in the hardware. Photo: CC BY 2.0, via Wikimedia Commons.*

Chrome Nano dissolved that boundary. The AI is no longer a cloud service accessed through a browser. It is a 4 GB file installed on the device itself, in the user's profile directory, through an update system the user does not control. The distinction matters architecturally. A cloud-based AI service can be blocked at the network level. A school firewall can deny access to a specific endpoint. A model installed on the device's local storage is behind the firewall. It is already ***inside the building without being invited***.

Dana Kimura, the biology teacher in Portland whom "The Walled Garden" followed through her experience with NotebookLM's read-only mind maps, still uses Google's tools because her district's contract makes alternatives a bureaucratic impossibility. She prints the AI-generated mind maps and hands them to students with a red pen: "Fix this." It is a workaround. It is also a curriculum.[^6]

Kimura chose to use NotebookLM. She chose the workaround. She chose the red ink. Nobody asked her whether she wanted an AI model installed on every Chromebook in her classroom. The choice was not offered because Google's architecture does not distinguish between a security patch and a AI they control inside your machine.

## The Environmental Cost Nobody Budgeted

At the scale of Chrome's installation base, the silent download is not merely a consent event. It is an environmental one.

Alexander Hanff, the researcher who first documented the installation, calculated the carbon footprint of a single global push of 4 GB to Chrome's install base, which he estimated conservatively at over 2 billion active installations. The figure: between 6,000 and 60,000 tonnes of CO2-equivalent emissions, depending on the energy mix of the data centers and networks involved.[^7] Sixty thousand tonnes is roughly the annual carbon output of 13,000 passenger cars driven for a year.

Google's own published research, released in August 2025 through a partnership with MIT Technology Review, shows that a typical Gemini text query uses 0.24 watt-hours of energy.[^8] The figure is small per prompt. At the scale of billions of devices running on-device inference[^9] triggered by any website through any page visit, the aggregate is not small.

![[photo-server-room.jpg]]
*Server room at CERN. One global push of 4 GB to Chrome's install base generates up to 60,000 tonnes of CO2-equivalent emissions. The schools that absorbed the bandwidth cost were never consulted. Photo: Florian Hirzinger. CC BY-SA 3.0, via Wikimedia Commons.*

Schools absorbed the cost directly. A district managing 5,000 Chromebooks consumed roughly 20 terabytes of unplanned bandwidth. Districts in rural areas with metered internet connections paid for data they did not request, downloaded by software they did not choose to install, delivering capabilities they were never told about.

The mother in Charlotte does not know any of this. She signed a form in a cafeteria. The form said "digital learning tools." The tools now include a 4 GB large language model that arrived on her daughter's Chromebook without notification, without consent, and without a line item in the district's bandwidth budget. The form is still in a filing cabinet somewhere. The AI is on the device.

The question of what happens next, when any website can trigger the same download, is the subject of [Part 3: "The Next Guest."](/posts/blog/en/the-next-guest/)

---

*This article is Part 2 of  ["The Uninvited Guest"](/posts/blog/en/the-uninvited-guest/)* *series. The views expressed are those of the editorial board and do not necessarily reflect the positions of any institution mentioned.*

---

## Footnotes

[^1]: The Charlotte cafeteria scene first appeared in ["The Waiver Nobody Read,"](/resources/the-waiver-nobody-read/) published March 2026 in this series. The mother's experience is representative of the consent mechanism documented across multiple school districts.

[^2]: **COPPA (Children's Online Privacy Protection Act)** is a federal law enacted in 1998 that requires operators of websites and online services to obtain verifiable parental consent before collecting personal information from children under 13. The FTC enforces COPPA and has ruled that edtech companies cannot shift compliance responsibility to schools through contract terms. [ftc.gov](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa).

[^3]: **Federal Trade Commission**, "FTC Obtains Order Against Edmodo for Illegally Collecting Children's Personal Information and Using It for Advertising," May 2023. Case No. 202-3129. The $6 million penalty included a requirement to delete models and algorithms built using improperly collected children's data. [ftc.gov](https://www.ftc.gov/legal-library/browse/cases-proceedings/202-3129-edmodo-llc-us-v).

[^4]: **Prompt API** is a JavaScript interface built into Chrome that allows any website to access Google's Gemini Nano AI model running locally on the user's device. If the model is not already installed, calling the API triggers a multi-gigabyte download. The API is scheduled to be enabled by default in Chrome 148 (Q2 2026), meaning any website can invoke on-device AI without a separate consent dialog. [Chrome Prompt API documentation](https://developer.chrome.com/docs/ai/prompt-api).

[^5]: Leonie Haimson, executive director of Class Size Matters and co-chair of the Parent Coalition for Student Privacy. Filed FTC complaints against Google's education data practices in 2015 and 2021. In May 2026, joined a coalition calling for an AI moratorium in NYC public schools. Quoted in Chalkbeat New York, May 4, 2026. [Chalkbeat](https://www.chalkbeat.org/newyork/2026/05/04/state-comptroller-audit-finds-student-data-privacy-gaps-in-nyc-schools/). [classsizematters.org](https://classsizematters.org/).

[^6]: Dana Kimura's story first appeared in "The Walled Garden," published March 2026 in this series. Kimura is a biology teacher and Google Certified Educator at a public high school outside Portland, Oregon, with seventeen years of classroom experience.

[^7]: Carbon footprint estimate: 6,000 to 60,000 tonnes CO2-equivalent for a single global push of 4 GB to Chrome's 2 billion-plus active installations. Calculated by Alexander Hanff. [thatprivacyguy.com](https://www.thatprivacyguy.com/blog/chrome-silent-nano-install/).

[^8]: Google energy data: a typical Gemini text query uses 0.24 watt-hours of energy, emits 0.03 grams CO2-equivalent, and consumes 0.26 milliliters of water. Published August 2025. [MIT Technology Review](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/).

[^9]: **On-device inference** is when an AI model processes data directly on the user's hardware rather than sending it to a remote server. It can offer faster responses and greater privacy, but it requires the model to be downloaded and stored locally first. In the Chrome Nano context, on-device inference means the AI runs on the Chromebook itself, using the student's device resources.

---

*Sage.is AI-UI and Sage.Education are products of Startr LLC; their inclusion represents a disclosure of interest. No individuals quoted in this article were interviewed; all quotes are from published sources. Full disclosure and transparency is a feature, not a bug.*
