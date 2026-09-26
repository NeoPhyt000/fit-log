
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PlanItem } from "@/lib/types"


export default function PlanCard({
  item,
  variant,
  onRemove,
  onMarkDone,
}: {
  item: PlanItem;
  variant: "plan" | "saved";
  onRemove: () => void;
  onMarkDone?: () => void; 
}) {
  const { workout, status } = item;
  const isDone = status === "done";

  return (
    <div
      className={`card card-border flex-col items-center gap-4 p-4 sm:flex-row ${
        isDone
          ? "border-primary/50 bg-primary/5"
          : "border-base-300 bg-base-200"
      }`}
    >
      
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-field bg-base-300 sm:h-16 sm:w-16">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      
      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-base-content/60">{workout.equipment}</p>
    
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-outline btn-sm rounded-full border-base-300"
        >
          View Details
        </Link>
       
        {variant === "plan" && onMarkDone && (
          <button
            onClick={onMarkDone}
            className={`btn btn-sm rounded-full ${
              isDone ? "btn-primary" : "btn-outline border-base-300"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            Mark as Done
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="btn btn-outline btn-sm btn-circle border-base-300 text-base-content/60 hover:border-error/60 hover:text-error"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}