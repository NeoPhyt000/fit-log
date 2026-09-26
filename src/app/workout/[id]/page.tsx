"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BookmarkPlus, CalendarPlus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import Loader from "@/components/Loader";
import StatsRow from "@/components/StatsRow";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { addToPlan, addToSaved, isSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isStillMounted = true;

    
    setLoading(true);

    getWorkout(params.id)
      .then((data) => {
        if (isStillMounted) setWorkout(data);
      })
      .catch(() => {
        if (isStillMounted) setNotFound(true);
      })
      .finally(() => {
        if (isStillMounted) setLoading(false);
      });

    return () => {
      isStillMounted = false;
    };
  }, [params.id]);

  if (loading) return <Loader label="Loading workout…" />;

  if (notFound || !workout) {
    return (
      <div className="site-padding flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">
          Workout not found
        </h1>
        <button
          onClick={() => router.push("/")}
          className="btn btn-primary rounded-full"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const specs: [string, string][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];

  const alreadySaved = isSaved(workout.id);

  return (
    <div className="site-padding grid gap-10 py-10 lg:grid-cols-2 lg:py-16">
      <div className="relative aspect-square w-full overflow-hidden rounded-box border border-base-300 bg-base-200 lg:aspect-auto lg:h-full">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="badge badge-sm border-base-300 bg-base-300/60 text-[11px] font-semibold uppercase tracking-wide text-base-content/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm text-base-content/60 sm:text-base">
            {workout.description}
          </p>

          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
            className="mt-4"
          />
        </div>

        <div className="card card-border border-base-300 bg-base-200">
          <div className="divide-y divide-base-300">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-3 text-sm"
              >
                <span className="uppercase tracking-wide text-base-content/60">
                  {label}
                </span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">
            Instructions
          </h2>
          <ol className="mt-3 flex flex-col gap-3">
            {workout.instructions.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm text-base-content/60"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-content">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(workout)}
            className="btn btn-primary flex-1 rounded-full"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to today&apos;s plan
          </button>

          <button
            onClick={() => addToSaved(workout)}
            disabled={alreadySaved}
            className="btn btn-outline flex-1 rounded-full border-base-300"
          >
            <BookmarkPlus className="h-4 w-4" />
            {alreadySaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
