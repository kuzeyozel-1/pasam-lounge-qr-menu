"use client";

import { useEffect } from "react";
import { useSettings } from "@/context/settings-provider";

export function FaviconSync() {
  const { settings } = useSettings();
  const favicon = settings.general.favicon;

  useEffect(() => {
    if (!favicon) return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;
  }, [favicon]);

  return null;
}
