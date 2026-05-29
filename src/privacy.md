---
layout: about
permalink: /privacy/
title: "Sage.Education Privacy"
description: >-
  Plain-language privacy policy for sage.education — what we collect, why,
  how long we keep it, and the rights you have wherever you live, with the
  student-data sections schools usually need.
canonical: privacy/
date: 2026-05-29
---

This policy explains how sage.education, the marketing site you're reading right now, handles information about you. If anything is unclear, email [privacy@sage.education](mailto:privacy@sage.education) and we'll fix the wording.

**Last updated:** {{ page.date | htmlDateString }}
**Effective:** {{ (dateEffective or page.date) | htmlDateString }}

## 1. What this policy covers

This policy covers sage.education and nothing else. It describes what happens when you read a page on the site, submit a form (newsletter, sign-up, support, or contact), or email one of our `@sage.education` addresses.

When a school, district, or other institution runs its own instance of the Sage AI-UI for students or staff, that deployment has its own privacy posture set by the institution. The institution is the controller of any data its users put into that instance, and the institution's policy governs the experience. See section 8.

When you sign in to the hosted Sage app at sage.startr.cloud, that app has its own privacy policy and that one applies.

The legal entity behind sage.education is {{ site.legal.entity }}, a {{ site.legal.jurisdiction }}. Contact details are in section 12.

## 2. What we collect when you visit

When a page loads, we record a page view in our self-hosted analytics. The software is Matomo, running at `visitas.startr.cloud`. What we record:

- The page you visited
- The page that linked here (your referrer)
- Your user-agent string (browser and OS)
- A truncated IP address
- A short-lived cookie on `.sage.education` so a return visit isn't double-counted

We do not:

- Fingerprint your browser
- Track you across other sites
- Sell, share, or rent this data to anyone
- Embed third-party ad networks, social pixels, or marketing trackers
- Use Google Analytics, Mixpanel, Segment, or anything similar

We use the analytics to see which pages get read and where readers come from. That's the whole point of running it.

## 3. What we collect when you contact us

When you sign up for the Sage.Education beta or newsletter through our self-hosted Mautic at `nota.startr.cloud`, we record the fields you submit (typically email, name, and whatever role or institution context the form asks for). We send a confirmation, then occasional updates. Every email has an unsubscribe link.

When you fill in a support or inquiry form (also Mautic at `nota.startr.cloud`), we receive the form fields, usually an email and a message. We use them to reply to you.

`mailto:` links open your email client and send a message to the address listed (such as `info@sage.education` or `privacy@sage.education`). The message comes straight to us, no third party in the path.

Sign-up confirmations and a few other one-shot replies go out through Resend, a transactional email provider. They process the recipient address and message body to deliver the email and nothing more.

## 4. What stays in your browser

The site uses local storage to remember which pages you've bookmarked and to keep your place on long pages. It uses session storage to cache short-lived data such as resource listings during the page session. Neither of these is sent to any third party. You can clear them at any time through your browser's site-data settings.

## 5. Who else sees your data (sub-processors)

Two third parties get data because we need them to operate:

<!-- markdownlint-disable MD032 -->
{% for proc in site.legal.subProcessors -%}
- {{ proc.description }} See [{{ proc.name }} privacy policy]({{ proc.policyUrl }}).
{% endfor %}
<!-- markdownlint-enable MD032 -->

The other services sage.education depends on are self-hosted by us, so no third party processes the data:

<!-- markdownlint-disable MD032 -->
{% for line in site.legal.selfHostedServices -%}
- {{ line }}
{% endfor %}
<!-- markdownlint-enable MD032 -->

Earlier versions of sister sites used Google Fonts and Mailchimp. We removed both across the family.

## 6. How long we keep your data

| Data class | Default retention | Source for the rule we follow |
| --- | --- | --- |
| Newsletter or beta-list subscriber email | Until you unsubscribe, plus 30 days for downstream propagation | [GDPR Art. 17 (right to erasure)](https://gdpr-info.eu/art-17-gdpr/); [CAN-SPAM Act § 7704(a)(3)](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-316) |
| Sign-up form submissions (school or institution contact) | 2 years from your last contact with us | [GDPR Art. 5(1)(e) storage limitation](https://gdpr-info.eu/art-5-gdpr/) |
| Support and inquiry form submissions | 2 years from your last contact with us | [GDPR Art. 5(1)(e)](https://gdpr-info.eu/art-5-gdpr/) |
| Analytics (Matomo) | 14 months of aggregated visit data | [Matomo's retention guidance](https://matomo.org/faq/general/faq_30/); aligns with [GA4's default 14-month retention](https://support.google.com/analytics/answer/7667196) |
| Email correspondence | 2 years from the last reply | [GDPR Art. 5(1)(e)](https://gdpr-info.eu/art-5-gdpr/), operational support window |

If you ask us to delete your data sooner, we'll do it. See section 9.

## 7. Where your data lives

Our infrastructure runs across multiple regions. For a given workload, your data may sit on a server in:

<!-- markdownlint-disable MD032 -->
{% for region in site.legal.hostingRegions -%}
- {{ region }}
{% endfor %}
<!-- markdownlint-enable MD032 -->

If you're an institutional client, you can ask us to keep your data in a specific region as part of your engagement, and we'll document that with you. Most institutional deployments are self-hosted on the institution's own infrastructure, so this question only applies to data you send through the sage.education marketing site itself.

When personal data moves between regions (for example, an EU visitor's form submission stored on a US server) we rely on Standard Contractual Clauses for the EU-to-US transfer, and where it applies, the EU-US Data Privacy Framework. Cloudflare serves cached static content from its global edge, so the public HTML of any page may be cached close to you.

## 8. Children and student data

This is the section schools and parents usually want to read first.

The sage.education marketing site is not directed at children, and we don't intentionally collect personal data from a child through it.

The Sage AI-UI itself is what schools and districts deploy for students. In that arrangement:

- **The institution is the data controller** for any student personal data, under the laws that apply to that institution (FERPA in the US, the GDPR and local equivalents in Europe, PIPEDA in Canada, and any sub-national rules such as state student-privacy statutes or provincial privacy acts).
- **Most deployments are fully self-hosted on the institution's own infrastructure.** When that's the case, no student data ever reaches us. The institution holds it end to end.
- **Where we do process student data** as part of a managed service, we act as a processor under the institution's written instructions, and we don't use student data to train models, to advertise, or for any purpose the institution hasn't authorised.

If you're a parent or student with a question about how your school's instance handles data, ask the institution first. They hold the records.

If we ever learn that we collected personal data from a child through the sage.education marketing site by mistake, we'll delete it. We follow:

- **[COPPA](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)** for children under 13 in the United States. We don't knowingly collect their personal information through this site, and where we operate as a processor for a US school, the school provides any consent required under COPPA's school-authorisation pathway.
- **[FERPA](https://studentprivacy.ed.gov/ferpa)** for student education records in the United States. Where we hold records as a "school official" under a contract with an institution, we follow the institution's instructions and the FERPA limits that apply to that role.
- **[GDPR Art. 8](https://gdpr-info.eu/art-8-gdpr/)** for children under 16 in EU member states that apply that threshold (some apply 13, 14, or 15 — the local rule wins).
- **[PIPEDA](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/)** and applicable provincial student-privacy law for institutions in Canada.
- **State student-privacy law** (such as California's SOPIPA, New York's Education Law § 2-d, Colorado's SDPA, and similar statutes) for US deployments in jurisdictions that have them. We follow the rules that apply to where the school operates.

We've signed the [Student Privacy Pledge](https://studentprivacypledge.org/privacy-pledge-2-0/) for the institutional Sage AI-UI service. The pledge commits us not to sell student data, not to use it for targeted advertising, not to build a non-educational profile from it, and to keep handling it under terms the institution sets.

## 9. Your rights

No matter where you live, you can ask us to:

- Give you access to the personal data we hold about you
- Correct anything that is wrong
- Delete it (with the caveat that we may need to keep some records for the tax and legal periods in section 6)
- Export what we have in a portable format
- Withdraw consent for anything you previously opted in to (such as the newsletter)
- Object to processing where we rely on legitimate interest
- Lodge a complaint with your local data-protection regulator

Send requests to [privacy@sage.education](mailto:privacy@sage.education). We'll respond within the time your jurisdiction requires (usually 30 days; some regions allow 45). We may need to verify who you are before handing over data, so we don't accidentally give it to someone else.

For student data held in an institutional Sage deployment, send the request to your school or district first. They are the controller, and they will route it to us if processor-side action is needed.

The sections below add the rules that apply if you live in a specific region.

### European Union and EEA (GDPR)

Our legal bases for processing are:

- Legitimate interest for the self-hosted analytics in section 2 and for replying to your inquiries
- Consent for the newsletter and beta sign-up. You opt in, and you can withdraw any time through the unsubscribe link or by writing to us
- Contract for processing institutional sign-ups and supporting an existing client engagement

You have the right to lodge a complaint with the data protection authority in the EU member state where you live, where you work, or where the alleged infringement happened. A directory of authorities is at [edpb.europa.eu/about-edpb/about-edpb/members_en](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en).

Our EU representative under Article 27 of the GDPR is **{{ site.legal.euRepresentative }}**, on-site at the European contact address in section 12. They can receive data-subject requests and supervisory-authority correspondence on our behalf.

### United Kingdom (UK GDPR)

The same rights and legal bases as the EU section above apply. For now, UK data subjects should send requests to our European contact in section 12. We haven't appointed a separate UK representative under UK GDPR Article 27 yet, and we'll update this section once we do. You can complain directly to the Information Commissioner's Office (ICO) at any time at [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/).

### Switzerland (FADP)

The Swiss [Federal Act on Data Protection (FADP)](https://www.fedlex.admin.ch/eli/cc/2022/491/en) gives you the same rights to access, correct, delete, and object. You can contact the Federal Data Protection and Information Commissioner (FDPIC) at [edoeb.admin.ch](https://www.edoeb.admin.ch/edoeb/en/home.html).

### United States (FERPA, COPPA, state student-privacy laws)

When the institutional Sage deployment is involved, the rules in section 8 apply — your school or district is the first stop for any request about student records. We support institutions in meeting FERPA's annual-notice, directory-information, and parental-access obligations as part of the deployment contract.

For US visitors who use the sage.education marketing site directly (not through a school), the rights in section 9 apply globally — write to [privacy@sage.education](mailto:privacy@sage.education).

### California (CCPA / CPRA + SOPIPA)

Under the [California Consumer Privacy Act](https://oag.ca.gov/privacy/ccpa) as amended by the CPRA, you have the right to:

- Know what personal information we collect and how we use it (this document covers that)
- Delete the personal information we hold
- Correct inaccurate information
- Limit our use and disclosure of sensitive personal information. We don't collect anything we'd classify as "sensitive" under the law.
- Opt out of "sale" or "sharing" of your personal information. We don't sell or share personal information for advertising or any other purpose.
- Non-discrimination. We won't deny service, charge a different price, or give you a worse experience because you exercised any of these rights.

For California schools using the institutional Sage deployment, [California's SOPIPA](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201320140SB1177) governs how operators handle K–12 student data. We follow it where it applies: no targeted advertising to students, no selling student information, no building a non-educational profile from it, and deletion when the school asks.

Send California requests to [privacy@sage.education](mailto:privacy@sage.education). We don't have a "Do Not Sell or Share My Personal Information" toggle because we don't do either of those things.

### Canada (PIPEDA + provincial student-privacy law)

Under the [Personal Information Protection and Electronic Documents Act](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/), you can ask for access, correction, and deletion through the rights in section 9. You can complain to the Office of the Privacy Commissioner of Canada at [priv.gc.ca/en/report-a-concern](https://www.priv.gc.ca/en/report-a-concern/).

For institutional Sage deployments operating in a province with its own privacy or student-data law (Quebec's Law 25, British Columbia's PIPA, Alberta's PIPA, Ontario's MFIPPA for school boards, and similar), the provincial rule applies on top of PIPEDA. We support institutional clients in meeting the obligations that apply to their province.

### India (Digital Personal Data Protection Act 2023)

If you are in India, the [Digital Personal Data Protection Act 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) gives you the right to information, correction, erasure, grievance redressal, and to nominate someone to act on your rights after death.

For grievances under the Act, write to [privacy@sage.education](mailto:privacy@sage.education) and we'll respond within the period the Act requires. If that doesn't resolve it, you can escalate to the Data Protection Board of India.

### Australia (Privacy Act 1988 + APPs)

We follow the [Australian Privacy Principles](https://www.oaic.gov.au/privacy/australian-privacy-principles) when we handle personal information of Australian residents. You can complain to the Office of the Australian Information Commissioner (OAIC) at [oaic.gov.au/privacy/privacy-complaints](https://www.oaic.gov.au/privacy/privacy-complaints).

### New Zealand (Privacy Act 2020)

We follow the [Information Privacy Principles](https://www.privacy.org.nz/privacy-act-2020/privacy-principles/) under the New Zealand Privacy Act 2020. You can complain to the Office of the Privacy Commissioner at [privacy.org.nz/your-rights/making-a-complaint](https://www.privacy.org.nz/your-rights/making-a-complaint/).

## 10. Security

We encrypt data at rest (256-bit AES), in transit (TLS 1.2 or higher), and authenticate with OAuth 2.0 where applicable. Backups run several times a day across geographically separated locations.

For the institutional Sage AI-UI, the bulk of the security posture is set by where the deployment runs. Self-hosted deployments inherit the institution's own infrastructure controls; managed deployments inherit ours. We share a security questionnaire with institutional clients on request as part of the procurement conversation.

If you spot a security issue, write to [izzy@sage.education](mailto:izzy@sage.education) or [alex@sage.education](mailto:alex@sage.education) and we'll come back to you quickly.

## 11. Changes to this policy

When we change this policy, we update the **Last updated** date at the top. If a change materially expands what we collect or who we share it with, we email newsletter subscribers and post the change in the project's [updates feed]({{ site.githubUpdatesUrl }}). The current version of this policy lives at [sage.education/privacy](https://sage.education/privacy).

## 12. Contact

For privacy questions, requests, or complaints, write to [privacy@sage.education](mailto:privacy@sage.education).

**{{ site.legal.addresses.eu.label }}:**
{% for line in site.legal.addresses.eu.lines -%}
{{ line }}
{% endfor %}
**{{ site.legal.addresses.us.label }}:**
{% for line in site.legal.addresses.us.lines -%}
{{ line }}
{% endfor %}

If you'd rather write to a human directly, [Alex](mailto:alex@sage.education) or [Izzy](mailto:izzy@sage.education) will answer.

Our sister site sage.is publishes its own version of this policy at [sage.is/privacy](https://sage.is/privacy). They cover the same legal entity and most of the same infrastructure; the differences are the things specific to each site (hardware ordering on sage.is, institutional and student data on sage.education).
