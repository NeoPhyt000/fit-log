# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, open a detailed breakdown of any exercise, lock lifts into **Today's Plan** (capped at five), **Save** others for later, and watch your daily exercise/minutes/calories totals update live — all persisted locally so your plan survives a refresh.

Live data is pulled from the FitLog API: `https://api.abcz.workers.dev/api/fitlog`.

## 🛠️ Technologies Used

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **daisyUI v5** (custom `fitlog` theme) for styling and full responsiveness
- **lucide-react** for icons
- Browser **localStorage** for persisting the plan/saved state
- FitLog REST API for workout data

## ✨ Key Features

1. **Responsive workout library** — a 3×4 card grid on desktop that collapses gracefully to 2 columns on tablet and 1 column on mobile, each card showing an image, category tags, equipment, and a duration/calories/rating stats row.
2. **Sort By dropdown** — instantly re-sorts the library by Duration, Calories, or Rating.
3. **Workout detail pages** (`/workout/[id]`) with a full spec panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **Today's Plan & Saved system** — "Add to today's plan" and "Save for later" buttons update the navbar's live Plan/Saved badge counters and fire toast notifications; the plan is capped at 5 lifts.
5. **My Plan dashboard** (`/my-plan`) — live Exercises / Minutes / Calories summary cards, tabbed Today's Plan / Saved lists, Mark as Done and Remove actions, a loading state, and a friendly empty state.
6. **Persistent state** — the plan and saved lists are stored in `localStorage`, so they survive a page reload.
7. **Polished error handling** — a custom 404 page, graceful API error states, and loading indicators throughout.
8. **Custom daisyUI theme** — a hand-tuned `fitlog` daisyUI theme (dark base colors, lime `#ccff00` primary, pill-shaped buttons/badges) applied consistently across buttons, cards, tabs, stats, and alerts.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
  app/
    page.tsx                 # Home (Hero + Library)
    workout/[id]/page.tsx    # Workout detail page
    my-plan/page.tsx         # My Plan dashboard
    not-found.tsx            # 404 page
    layout.tsx / globals.css # Root layout & theme
  components/                # Navbar, Footer, WorkoutCard, PlanCard, etc.
  context/                   # PlanContext (plan/saved state), ToastContext
  lib/                       # API client, types, storage helpers
```

## 📦 Deployment

This project deploys cleanly to Vercel (`vercel deploy`) or any Node hosting that supports Next.js. Remote workout images are whitelisted in `next.config.ts` under `images.remotePatterns`.
