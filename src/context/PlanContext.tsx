"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PlanItem, Workout } from "@/lib/types";
import { readStorage, writeStorage } from "@/lib/storage";
import { useToast } from "./ToastContext";

const PLAN_KEY = "fitlog:today-plan";
const SAVED_KEY = "fitlog:saved";

export const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  hydrated: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    
    setPlan(readStorage<PlanItem[]>(PLAN_KEY, []));
    setSaved(readStorage<PlanItem[]>(SAVED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const isInPlan = (id: number) => plan.some((item) => item.workout.id === id);
  const isSaved = (id: number) => saved.some((item) => item.workout.id === id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      showToast("Already in your plan");
      return;
    }

    if (plan.length >= PLAN_CAP) {
      showToast("Today's plan is full — 5/5 lifts. Finish one first.");
      return;
    }

    setPlan((prev) => [
      ...prev,
      { workout, status: "pending", addedAt: Date.now() },
    ]);
    showToast("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      showToast(`${workout.name} is already saved`);
      return;
    }

    setSaved((prev) => [
      ...prev,
      { workout, status: "pending", addedAt: Date.now() },
    ]);
    showToast("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.workout.id !== id));
    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.workout.id !== id));
    showToast("Removed from saved");
  };

  const markDone = (id: number) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.workout.id === id
          ? { ...item, status: item.status === "done" ? "pending" : "done" }
          : item
      )
    );
    showToast("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        hydrated,
        isInPlan,
        isSaved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
