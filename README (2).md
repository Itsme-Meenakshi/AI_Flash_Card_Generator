# ✦ FlashAI — AI Flashcard Generator

> An AI-powered study tool that turns any topic into flashcards, key concepts, and revision notes — instantly.

Built with HTML, CSS, JavaScript + **Anthropic Claude API**, deployed on **Vercel**.

🔗 **Live demo:** [your-vercel-link-here]

---

## What it does

Type any topic → click Generate → get:
- 🃏 **Flashcards** — flip-to-reveal Q&A cards
- 📖 **Key Concepts** — term + definition glossary
- 📝 **Revision Cards** — topic sections with bullet points
- ⬇ **Export** — download JSON or copy all text

---

## Project structure

```
flashcard-generator/
├── api/
│   └── generate.js     ← Vercel serverless function (API key lives here, server-side)
├── public/
│   └── index.html      ← Frontend (no API key — safe to push to GitHub)
├── vercel.json         ← Vercel routing config
└── README.md
```

> ⚠️ The API key is stored as an **environment variable on Vercel** — it never appears in the code.

---

## Deploy to Vercel (step by step)

### 1. Push this repo to GitHub
Upload all files as-is. The API key is NOT in the code, so it's safe.

### 2. Connect to Vercel
- Go to [vercel.com](https://vercel.com) → Sign up with GitHub
- Click **Add New Project** → Import your GitHub repo
- Click **Deploy**

### 3. Add your API key on Vercel
- Go to your project → **Settings → Environment Variables**
- Add:
  - Name: `ANTHROPIC_API_KEY`
  - Value: `sk-ant-api03-your-actual-key`
- Click **Save** → then **Redeploy**

### 4. Done!
Your live URL is ready. The API key is secret, the site is public.

---

## Run locally

```bash
# Install Vercel CLI
npm install -g vercel

# Create a .env.local file (this file is gitignored)
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local

# Run locally
vercel dev
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Vercel Serverless Functions (Node.js) |
| AI Model | Claude Sonnet (`claude-sonnet-4-20250514`) |
| Hosting | Vercel |

---

## Internship Task

Built as **Day 6 Task** for the Tomatrix Summer Internship.
> *"Build a functional AI-powered tool that takes lesson content as input and automatically generates flashcards, key concepts, and revision cards."*
