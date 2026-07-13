"use client";

import { useState } from "react";
import { Check, Copy, Wifi } from "lucide-react";
import { useSettings } from "@/context/settings-provider";
import { cn } from "@/lib/utils";

const NETWORK_NAME = "Paşam Lounge Misafir";

export function WifiSheetContent() {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(settings.wifi.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-muted p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <Wifi className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-foreground/50">Ağ Adı</p>
          <p className="font-medium">{NETWORK_NAME}</p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted p-4">
        <div>
          <p className="text-xs text-foreground/50">Şifre</p>
          <p className="font-medium tracking-wide">{settings.wifi.password}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Şifreyi kopyala"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors",
            copied && "border-brand-400 text-brand-600 dark:text-brand-400"
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
