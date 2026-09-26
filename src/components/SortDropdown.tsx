"use client";

import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

const options: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm">
      <span className="text-base-content/60">Sort By</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="select select-ghost select-sm appearance-none pr-5 font-semibold focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.key} className="bg-base-200">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-base-content/60" />
    </label>
  );
}
