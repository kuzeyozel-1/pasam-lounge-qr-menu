"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin", label: "Ürünler", icon: LayoutGrid },
  { href: "/admin/settings", label: "Ayarlar", icon: SlidersHorizontal },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="glass sticky top-[65px] z-20 border-b border-border px-4 py-2 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-2xl gap-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-transparent bg-brand-500 text-white"
                  : "border-border text-foreground/70 hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
