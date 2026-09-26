import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
  className = "",
}: {
  duration: number;
  calories: number;
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs text-base-content/60 ${className}`}
    >
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame className="h-3.5 w-3.5" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
        {rating}
      </span>
    </div>
  );
}
