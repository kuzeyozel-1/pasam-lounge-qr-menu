"use client";

import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSettings } from "@/context/settings-provider";

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const { settings } = useSettings();

  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border px-4 py-3 backdrop-blur-md">
      <div>
        <p className="text-xs text-foreground/50">{settings.general.siteName}</p>
        <h1 className="text-lg font-semibold tracking-tight">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={onLogout}
          aria-label="Çıkış yap"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
