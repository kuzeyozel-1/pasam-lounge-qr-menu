"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/menu";
import { CategoryIcon } from "./category-icon";

interface CategoryPillsProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export function CategoryPills({
  categories,
  selected,
  onSelect,
}: CategoryPillsProps) {
  const items: Category[] = [
    { id: "all", name: "Tümü", icon: "utensils" },
    ...categories,
  ];

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
      {items.map((item) => {
        const isActive = selected === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
              isActive
                ? "border-transparent text-white"
                : "border-border text-foreground/70 hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-pill"
                initial={false}
                className="absolute inset-0 z-0 rounded-full bg-brand-500 shadow-glow"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <CategoryIcon icon={item.icon} className="h-3.5 w-3.5" />
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
