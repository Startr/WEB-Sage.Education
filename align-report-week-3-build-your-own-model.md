# Alignment report — week 3: build-your-own-model

## Agreements

- **Core idea** — all three define fine-tuning the same way: teaching a model by showing it examples of the behaviour you want (ask, don't hand over a plan).
- **Starter set size** — all say ~24 examples are provided.
- **Training duration** — all agree on ~20–30 minutes for the training cell itself.
- **"Can't break it" promise** — present in notebook, script (beat 3), email, and chapter.
- **Before-and-after payoff** — all three culminate in the same question asked of the plain model and the tuned model.
- **Nothing to install** — notebook, email, and chapter all state this.
- **Step-away permission** — notebook, script, and email all explicitly give the reader permission to leave during training.

---

## Divergences

### 1. LoRA explanation in the script is far too technical

| Artefact | What it says |
| --- | --- |
| **Notebook** | "a small add-on called a LoRA. That add-on is what keeps this fast and free." |
| **Script** | Izzy defines LoRA, then Alex explains "rank-decomposition matrices," "attention layers," and "freezes the pre-trained model." |
| **Chapter** | Does not mention LoRA. |

**PROPOSED FIX (notebook wins on mechanics; style guide wins on reading level).** The script's Alex line ("Instead of updating all the model's weights…rank-decomposition matrices…attention layers") is grade 12+ vocabulary and violates the FK 6–7 ceiling and the "no experience needed" promise. Replace Alex's technical expansion with something closer to the notebook's language: *"Instead of retraining the whole model, we train a small add-on. That's what keeps it fast and free on a free computer."* The chapter should also add one line mentioning LoRA by name, matching the notebook's Step 6 phrasing.

### 2. "maths" in the script

| Artefact | What it says |
| --- | --- |
| **Script** | "You don't have to understand the maths today." |
| **Style guide** | Ruling: **"math," not "maths."** Explicitly flags the week-3 script as the outlier. |

**PROPOSED FIX.** Change to "the math" in the script before recording.

### 3. How many examples the intern should write

| Artefact | What it says |
| --- | --- |
| **Notebook** | "Aim for 24 to 48, or more if you're on a roll." |
| **Script** | "two dozen more if you can, up to double that, or more if you're on a roll" — same range. |
| **Email** | "add 24 to 48 of your own" — same range. |
| **Chapter** | "two dozen or more of your own" — open-ended, no upper target. |

**PROPOSED FIX (notebook wins).** Chapter should say "two dozen to four dozen of your own, or more if you're on a roll" to match the notebook's guidance and give the reader a concrete upper target.

### 4. Total notebook duration

| Artefact | What it says |
| --- | -- |
| **Notebook** | "about 30–40 minutes" (top intro). |
| **Email** | "about 30 to 40 minutes start to finish." |
| **Script** | OST reads "Setup ~2 min · training ~20–30 min · before/after instant" — sums to ~25–35 min (excludes writing time). |
| **Chapter** | Only states the training segment: "twenty to thirty minutes." |

**PROPOSED FIX (notebook wins).** The chapter should give the full-run duration: "about thirty to forty minutes start to finish, most of it hands-off." The script's OST is fine as a breakdown but could note that total wall time including setup and writing is closer to 30–40 min.

### 5. Before-and-after cell: "~30 sec" vs "instant"

| Artefact | What it says |
| --- | --- |
| **Notebook** | Step 8: "~30 sec." |
| **Email** | "the last cell is instant." |
| **Chapter** | Implies instant. |

**PROPOSED FIX (notebook wins).** Minor, but change the email and chapter wording to "takes about thirty seconds" to match the notebook's honest duration.

### 6. What to share / deliverable mismatch

| Artefact | What it says |
| --- | --- |
| **Notebook** | "Reply on the share thread with your before-and-after: the same question, two different answers." |
| **Script** | "Send us your before and after by sharing your completed notebook." |
| **Email (kickoff)** | "Send us your examples and your before-and-after." |
| **Email (follow-up)** | "share your notebook…take a screenshot…and copy over the examples you wrote too." |

The notebook asks only for the before-and-after. The email also asks for the examples. The script says to share the whole notebook (which contains both).

**PROPOSED FIX (flag for human).** Decide which is the real ask. If the team wants to see the intern's custom examples (likely, for feedback), update the notebook's closing line to: "Share your completed notebook with us — that includes the examples you wrote and your before-and-after." Then align the script and email to the same wording.

### 7. "One optional cell" vs two optional cells for saving

| Artefact | What it says |
| --- | --- |
| **Notebook** | Step 9 (save to Hugging Face) + Step 9 stretch (export GGUF for Ollama) — two separate optional cells. |
| **Script** | "a few optional cells at the end that save it." |
| **Email** | "one optional cell at the end that saves your trained model to your own account." |
| **Chapter** | Does not mention saving at all. |

**PROPOSED FIX (notebook wins).** Email should say "a couple of optional cells" (or "an optional cell or two") to avoid understating. The chapter should add a brief line: "There are a couple of optional cells at the end that save your model to your own account, so it's yours to keep. No pressure to do that this week."

### 8. Chapter is missing several required sections per the style guide

The chapter skeleton (§6 of the style guide) calls for sections the chapter currently lacks:

| Required section | Present? |
| --- | --- |
| Warm welcome + one-line recap | ✅ |
| Video embed | ✅ |
| The idea (bold term, definition, analogy) | ✅ (no analogy though — script uses "teaching a new person a job," chapter doesn't) |
| Try it now / Colab CTA | ✅ |
| **Your one thing** (task, deadline, duration, share mechanics) | ❌ Missing |
| **Fallback paragraph** (Google-account alternative) | ❌ Missing |
| **Self-check** (checkbox checklist, "(no pressure)") | ❌ Missing |
| **Outro** ("Stuck on anything?…" + support link) | ✅ (but minimal) |

**PROPOSED FIX (style guide governs chapter structure).** Add:

- A **"Your one thing"** section after the CTA with the task (write 24–48 examples, run the notebook, share your before-and-after), honest duration, and share mechanics matching the notebook.
- A **fallback paragraph**: "If you can't use a Google account — maybe your school blocks it, your family prefers not to, or it isn't available where you are — that's completely fine. Reply and we'll get you set up on our own computers." (The email already has this language.)
- A **self-check checklist** with checkboxes, e.g.: `- [ ] Wrote my own examples (24–48)`, `- [ ] Ran the notebook top to bottom`, `- [ ] Saw the before-and-after`, `- [ ] Shared my notebook`, framed with "(no pressure)."
- The "idea" paragraph should borrow the script's analogy: "the way you'd help a new person learn a job by showing them a few good examples."

### 9. The chapter doesn't mention writing your own examples at all

| Artefact | What it says |
| --- | --- |
| **Notebook** | Entire Step 4 (~15–25 min) with detailed guidance on sourcing ideas. |
| **Script** | Beat 4 + beat 6 both emphasise writing your own examples. |
| **Email** | A full paragraph on writing examples with tips. |
| **Chapter** | "Early on there's a cell for writing in your own examples." — one clause, no guidance. |

**PROPOSED FIX (notebook wins on mechanics; script wins on pedagogy).** The chapter needs a short paragraph (3–4 sentences) that names the task and gives the same idea-sources the notebook and email do: mine your own week, use the planning-trap list, draft with an AI tool and rewrite into your voice. This is the core creative work of the week and should not be buried in a subordinate clause.
