"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isStillMounted = true;

    getWorkouts()
      .then((data) => {
        if (isStillMounted) setWorkouts(data);
      })
      .catch(() => {
        if (isStillMounted) setError(true);
      })
      .finally(() => {
        if (isStillMounted) setLoading(false);
      });

    return () => {
      isStillMounted = false;
    };
  }, []);

  return (
    <>
      <Hero />

      <section id="library" className="site-padding scroll-mt-20 py-14">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="mt-8">
          {loading && <Loader label="Loading workouts…" />}

          {!loading && error && (
            <div className="alert alert-error alert-soft rounded-box">
              Couldn&apos;t load the workout library. Please try again later.
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
