import { Workout } from "./types";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }

  return res.json();
}


export async function getWorkout(id: string | number): Promise<Workout> {
  try {
    
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();
      
      const workout = Array.isArray(data) ? data[0] : data;
      if (workout && workout.id) return workout as Workout;
    }
  } catch {
    
  }

 
  const allWorkouts = await getWorkouts();
  const found = allWorkouts.find((w) => String(w.id) === String(id));

  if (!found) {
    throw new Error("Workout not found");
  }

  return found;
}