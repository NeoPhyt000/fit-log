💪 FitLog — Workout Library

# FitLog

FitLog is a workout tracker app. It's basically a small gym app — you can browse a list of workouts, click into one to see the details, and add it to your plan for today or save it for later. Everything is dark themed.

## Technologies Used

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- daisyUI 
- lucide-react for icons
- Browser localStorage to save the plan/saved list

## Features

1. Home page shows all the workouts in a grid — 3 columns on desktop, 2 on tablet, 1 column on phone.
2. Each workout has its own detail page with a specs table and step by step instructions.
3. You can add a workout to "Today's Plan" or "Save for later", and both show a little toast popup so you know it actually worked.
4. My Plan page has an Exercises / Minutes / Calories counter at the top that updates automatically depending on what's in your plan, plus tabs for Today's Plan and Saved, and you can sort them by Duration, Calories or Rating.
5. Made a custom 404 page for random/broken routes, plus loading states so it doesn't look broken while the data is fetching.