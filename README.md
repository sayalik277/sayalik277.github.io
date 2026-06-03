# Sayali Kamble — Portfolio

> Personal portfolio · React 18 · TypeScript · Vite · Tailwind CSS · Seasonal colour themes

**Live:** [sayalik277.github.io](https://sayalik277.github.io)  
**Backend source:** [sayalik277/portfolio](https://github.com/sayalik277/portfolio)

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 · TypeScript · Vite · Tailwind CSS |
| Hosting | GitHub Pages (this repo) |
| Backend API | Python FastAPI · SQLite (separate repo) |

---

## 🚀 How it deploys

Every push to `main` triggers a GitHub Actions workflow that:
1. Runs `npm ci && npm run build`
2. Pushes the built `dist/` to the `gh-pages` branch
3. GitHub Pages serves from `gh-pages`

---

## 💻 Run locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

Set `VITE_API_URL` in a `.env` file to point at the backend:
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## ✏️ Personalising content

| File | What to edit |
|---|---|
| `src/data/projects.ts` | Projects |
| `src/data/experience.ts` | Work history |
| `src/data/books.ts` | Reading list |
| `src/data/skills.ts` | Skills + levels |
| `src/data/goals.ts` | Side Quests — 2026 goals + hobbies |
| `src/components/About.tsx` | Bio text |
| `src/components/Hero.tsx` | Typing roles |
| `src/components/Footer.tsx` | Social links |

---

## 🎨 Seasonal Themes

Auto-switches palette by month — Spring / Summer / Fall / Winter.

---

Built with React · TypeScript · and a lot of ☕  
[@sayalik277](https://github.com/sayalik277)
