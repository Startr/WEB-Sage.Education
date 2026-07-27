---
title: Get your work from Colab into the project
description: Your work lives in Colab. Your project lives in a Git repository. This chapter is the bridge — the no-token way that works on a Chromebook, the way that never leaves Colab, and the ten-second check that catches the one mistake nobody notices.
order: 9
---

You've been building in Colab. Your project — the repository you made from our starter template —
lives somewhere else. So there's one gap nobody has shown you how to cross: how does a file get from
Colab into a repository?

That's this chapter. There are two ways to do it, and **you only need one**. The first needs no
terminal and no password, and it works on a Chromebook or a phone. The second never leaves Colab.
**Start with the first one.** You can always come back for the second.

{% filmFrame "", "Get your work from Colab into the project" %}

## Before you start

You need a repository of your own to put the file in. If you already made one from our starter
template, that's the one — you're ready.

**Haven't made one yet?** It takes about two minutes and it's covered in
[Time travel with version control](/how-to-build-an-ai/time-travel-with-version-control/): open the
`Sage.Education-Starter` template, click **Use this template → Create a new repository**, give it a
name, keep it **Public**, and create it. Then come back here.

Keeping it public matters, and the last section of this chapter explains why.

## Route 1 — no terminal, no password

This is the one to start with. Nothing to install, and it works in any browser.

### Step 1 — get the file out of Colab

In a new cell, run this:

```python
from google.colab import files
files.download('agent.yaml')
```

Change `'agent.yaml'` to whatever your file is called. Run the cell, and the file lands in your
Downloads folder like any other download. That's the whole trick.

*If nothing happens,* your browser may be blocking the download. Look for a small blocked-popup icon
in the address bar and allow it.

### Step 2 — put the file in your repository

Open your own repository, the one you made from the starter template.

1. Click **Add file → Upload files**.
2. Drag your downloaded file in, or click to choose it.

### Step 3 — commit it

Under the upload you'll see a box for a message. Write what you added, plainly:
`Add my planner agent profile`. Then click **Commit changes**.

That's a save point — the same kind you've made before. Your file is in your project, and you can
come back to this exact version any time.

### Step 4 — copy the link

Click the file, and copy the URL out of the address bar. **That link is what you send us.**

The file being saved isn't what reaches us. The link arriving is. Before you send it, do the check in
the next section — it takes ten seconds and it catches the one thing that goes wrong silently.

The link is one of the three things the hand-in asks for; the other two don't involve Git at all. See
[Name and build your agent](/how-to-build-an-ai/name-and-build-your-agent/).

## Route 2 — without leaving Colab

Your file is already in Colab, so you can do all of this in a cell instead. Nothing here is required;
Route 1 gets your work in perfectly well.

### First, your token

Git needs to know it's really you. Not your account password: a **personal access token**, which is a
long string you generate in your GitHub settings.

**Never type a token into a cell.** Here's why that matters specifically: notebooks get shared. If
your token is sitting in a cell, you've handed it to everyone who reads it, and anyone holding it can
act as you.

Colab has a proper place for it. Click the **key icon** in the left sidebar — that's **Secrets** —
add your token there with the name `GIT_TOKEN`, switch on notebook access, and then hand it to Git
like this:

```python
from google.colab import userdata
import os
os.environ['GIT_TOKEN'] = userdata.get('GIT_TOKEN')
```

Nothing prints. From here on, the token only ever appears as `$GIT_TOKEN`.

Secrets stay with your account. They don't travel inside a shared copy of the notebook, which is
exactly what you want.

### Then clone, commit, push

```python
!git clone https://$GIT_TOKEN@github.com/YOUR-NAME/YOUR-REPO.git
%cd YOUR-REPO
!git config --global user.name  "Your Name"
!git config --global user.email "your@email.com"
!cp /content/agent.yaml .
!git add agent.yaml
!git commit -m "Add my planner agent profile"
!git push
```

Then refresh your repository in the browser, click the file, and copy the link — the same last step
as Route 1.

### The one trap

```python
!cd YOUR-REPO        # does nothing at all
%cd YOUR-REPO        # this is the one that works
```

Every `!` command runs in its own little session that closes immediately, so `!cd` moves you into a
folder and then throws that away. Use `%cd` instead. It's a Colab instruction rather than a shell
one, and it actually sticks. If your commands start failing for no visible reason, this is almost
always why.

### If you'd rather have a real terminal

Colab has one, and **it's free for everyone** — you don't need a paid plan. Look at the **bottom
left** of the notebook, near the Variables and Secrets icons, and click **Terminal**. It behaves like
a normal computer: `cd` works, and commands remember where you are. The same lines above work there
without the `!` and `%`.

Two more things, either way:

- **Use HTTPS, not SSH keys.** You may see guides that set up an SSH key. Don't, on free Colab —
  Colab's own rules don't allow SSH connections on the free runtime.
- **Colab forgets everything.** When your notebook disconnects, the machine is wiped and your clone
  goes with it. Push before you close the tab. Nothing is lost from your *repository* — only from the
  temporary machine.

## The ten-second check that matters

Whichever route you took, do this before you send the link.

**Paste your link into a private or incognito browser window** — one where you aren't signed in. If
the file loads, we can open it too. You're done.

If it says **not found**, your repository is set to private. This is the one failure that looks
exactly like success from your side: *your* link works, because you're signed in, so everything seems
fine right up until we tell you we can't see it.

The fix takes a click. Go to your repository's **Settings**, scroll to the bottom, and change the
visibility to **Public**. Then check the link again.

## Which one should I use?

| | Route 1 | Route 2 |
| --- | --- | --- |
| Needs a terminal | No | No (`!` cells work) |
| Needs a token | No | Yes |
| Works on a Chromebook or phone | Yes | Yes |
| Leaves Colab | Yes, briefly | No |
| Ends with | Copy the link, check it, send it | Copy the link, check it, send it |
| Good for | Getting your work in today | Once you're doing this often |

Both land in exactly the same place. Pick whichever sounds less scary — you're not choosing forever.

## Optional — offering your work to the project

Everything above gets your file into **your** repository and the link into our hands. That's the
first of the three things the hand-in asks for — the other two are the short transcript and the line
about why you chose the name, both listed in [Name and build your
agent](/how-to-build-an-ai/name-and-build-your-agent/). No more Git needed for either.

If you'd also like your work to go into *our* project, that's a different move called a **pull
request**, and it needs one extra thing: a line called a **sign-off**.

```text
Signed-off-by: Your Name <your@email.com>
```

That line says the work is yours to share. It's the same promise you already made in your Agreement,
written into the save point itself, and it's called the *Developer Certificate of Origin*, or DCO.
Most open-source projects use it.

Two things surprise people:

- **Nothing adds it for you in a browser.** You type it yourself, in the larger description box under
  the commit message — not the small message line. It's the step people forget.
- The email in the line should be **the same email as your account**, or it doesn't count for much.
- On a command line, `git commit -s` writes the line for you from the name and email you set.

The full walkthrough is in
[How to open your first pull request](/how-to-build-an-ai/open-your-first-pull-request/). This is a
step past handing your work in, not part of it, and nothing about your certificate depends on it.
Take it whenever you're curious.

## If it goes sideways

That's normal, and you really can't break anything here. Your repository keeps every version, and
it's your own copy, so nothing you do can damage anyone else's work.

If you get stuck, reply and tell us which step and what you saw. We're glad to do it with you.

## Related

- [Name and build your agent](/how-to-build-an-ai/name-and-build-your-agent/) — the file most people
  are moving when they get here
- [Time travel with version control](/how-to-build-an-ai/time-travel-with-version-control/) — where
  repositories, commits, history, and branches were introduced
- [How to open your first pull request](/how-to-build-an-ai/open-your-first-pull-request/) — the
  optional next step, if you want your name on the project
