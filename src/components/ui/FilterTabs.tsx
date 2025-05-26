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
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="min-w-max mx-auto inline-flex bg-white rounded-lg p-1 m-2 gap-1 shadow-md">
          {options.map((option) => (
            <button
              key={String(option.value)}
              onClick={() => onFilterChange(option.value)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === option.value
                  ? `${activeColor} text-white`
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
