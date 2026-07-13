"use client";

import { Home, MapPin, Search, UtensilsCrossed, Wifi, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavTab = "home" | "menu" | "search" | "wifi" | "location";

interface BottomNavProps {
  active: NavTab;
  onSelect: (tab: NavTab) => void;
}

const items: { id: NavTab; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Ana Sayfa", icon: Home },
  { id: "menu", label: "Menü", icon: UtensilsCrossed },
  { id: "search", label: "Ara", icon: Search },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "location", label: "Konum", icon: MapPin },
];

export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-30 border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-[11px] font-medium transition-colors",
                isActive ? "text-brand-600 dark:text-brand-400" : "text-foreground/50"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
