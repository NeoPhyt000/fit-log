"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell, Flame, Timer } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { PlanItem, SortKey } from "@/lib/types";
import PlanCard from "@/components/PlanCard";
import SortDropdown from "@/components/SortDropdown";
import Loader from "@/components/Loader";

type Tab = "plan" | "saved";

function sortItems(items: PlanItem[], sortKey: SortKey): PlanItem[] {
  const copy = [...items];

  switch (sortKey) {
    case "calories":
      return copy.sort(
        (a, b) => b.workout.caloriesBurned - a.workout.caloriesBurned
      );
    case "rating":
      return copy.sort((a, b) => b.workout.rating - a.workout.rating);
    case "duration":
    default:
      return copy.sort((a, b) => a.workout.duration - b.workout.duration);
  }
}

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } =
    usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const exerciseCount = plan.length;
  const totalMinutes = plan.reduce((sum, item) => sum + item.workout.duration, 0);
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );

  const baseItems = activeTab === "plan" ? plan : saved;
  const visibleItems = sortItems(baseItems, sortKey);

  return (
    <div className="site-padding py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          My Plan
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="stats stats-vertical sm:stats-horizontal mb-8 w-full border border-base-300 bg-base-200">
        <div className="stat place-items-center sm:place-items-start">
          <div className="stat-figure text-primary">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div className="stat-value font-display text-3xl">
            {exerciseCount}
          </div>
          <div className="stat-title text-[11px] uppercase tracking-wide">
            Exercises
          </div>
        </div>

        <div className="stat place-items-center sm:place-items-start">
          <div className="stat-figure text-primary">
            <Timer className="h-5 w-5" />
          </div>
          <div className="stat-value font-display text-3xl">
            {totalMinutes}
          </div>
          <div className="stat-title text-[11px] uppercase tracking-wide">
            Minutes
          </div>
        </div>

        <div className="stat place-items-center sm:place-items-start">
          <div className="stat-figure text-primary">
            <Flame className="h-5 w-5" />
          </div>
          <div className="stat-value font-display text-3xl">
            {totalCalories}
          </div>
          <div className="stat-title text-[11px] uppercase tracking-wide">
            Calories
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="tabs tabs-box inline-flex w-auto bg-base-200 p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`tab rounded-full px-4 font-semibold ${
              activeTab === "plan"
                ? "tab-active !bg-primary !text-primary-content"
                : ""
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`tab rounded-full px-4 font-semibold ${
              activeTab === "saved"
                ? "tab-active !bg-primary !text-primary-content"
                : ""
            }`}
          >
            Saved
          </button>
        </div>

        {hydrated && baseItems.length > 1 && (
          <SortDropdown value={sortKey} onChange={setSortKey} />
        )}
      </div>

      {activeTab === "plan" && (
        <p className="mb-4 -mt-2 text-xs text-base-content/60">
          {exerciseCount}/{PLAN_CAP} lifts logged today
        </p>
      )}

      {!hydrated && <Loader label="Loading workouts…" />}

      {hydrated && visibleItems.length === 0 && (
        <div className="card card-border flex flex-col items-center gap-3 border-base-300 bg-base-200 py-20 text-center">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide">
            Nothing Here Yet
          </h2>
          <p className="max-w-xs text-sm text-base-content/60">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn btn-primary mt-2 rounded-full">
            Go to workouts
          </Link>
        </div>
      )}

      {hydrated && visibleItems.length > 0 && (
        <div className="flex flex-col gap-3">
          {visibleItems.map((item) =>
            activeTab === "plan" ? (
              <PlanCard
                key={item.workout.id}
                item={item}
                variant="plan"
                onRemove={() => removeFromPlan(item.workout.id)}
                onMarkDone={() => markDone(item.workout.id)}
              />
            ) : (
              <PlanCard
                key={item.workout.id}
                item={item}
                variant="saved"
                onRemove={() => removeFromSaved(item.workout.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
