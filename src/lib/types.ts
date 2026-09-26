export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type PlanStatus = "pending" | "done";

export interface PlanItem {
  workout: Workout;
  status: PlanStatus;
  addedAt: number;
}

export type SortKey = "duration" | "calories" | "rating";
