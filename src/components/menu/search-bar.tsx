"use client";

import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar({ value, onChange }, ref) {
    return (
      <div className="glass sticky top-0 z-30 border-b border-border px-4 py-3">
        <div className="relative mx-auto flex max-w-2xl items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-foreground/40" />
          <input
            ref={ref}
            type="text"
            inputMode="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Menüde ara..."
            className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-foreground/40 focus:border-brand-400"
          />
        </div>
      </div>
    );
  }
);
