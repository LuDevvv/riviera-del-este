"use client";

import React from "react";

export interface FilterOption<T = string> {
  value: T;
  label: string;
}

interface FilterTabsProps<T = string> {
  options: FilterOption<T>[];
  activeFilter: T;
  onFilterChange: (filter: T) => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function FilterTabs<T extends string = string>({
  options,
  activeFilter,
  onFilterChange,
  variant = "primary",
  className = "",
}: FilterTabsProps<T>) {
  const activeColor = variant === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full overflow-x-auto scrollbar-hide px-4 py-2">
        <div className="flex justify-center">
          <div className="inline-flex bg-white rounded-xl p-1.5 gap-1 shadow-lg border border-gray-100 min-w-max">
            {options.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => onFilterChange(option.value)}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === option.value
                    ? `${activeColor} text-white shadow-sm`
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
