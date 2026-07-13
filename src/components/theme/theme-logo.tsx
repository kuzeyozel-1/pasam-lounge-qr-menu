"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "@/context/settings-provider";
import { cn } from "@/lib/utils";

export function ThemeLogo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Tema, sadece client'ta çözülebilir; hydration mismatch'i önlemek için gerekli.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-20 w-20 animate-pulse rounded-2xl bg-surface-muted",
          className
        )}
      />
    );
  }

  const src =
    resolvedTheme === "dark"
      ? settings.general.logoDark
      : settings.general.logoLight;

  return (
    <Image
      src={src}
      alt={settings.general.siteName}
      width={240}
      height={240}
      priority
      className={cn("h-20 w-20 rounded-2xl object-contain", className)}
    />
  );
}
