import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card card-border group overflow-hidden border-base-300 bg-base-200 transition-transform hover:-translate-y-1 hover:border-primary/60"
    >
      <figure className="relative aspect-[4/3] w-full overflow-hidden bg-base-300">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>

      <div className="card-body gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="badge badge-sm border-base-300 bg-base-300/60 text-[10px] font-semibold uppercase tracking-wide text-base-content/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="card-title font-display text-base font-bold uppercase leading-tight tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-base-content/60">{workout.equipment}</p>

        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-auto pt-2"
        />
      </div>
    </Link>
  );
}
