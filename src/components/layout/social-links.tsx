"use client";

import { MessageCircle } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from "@/components/icons/brand-icons";
import { useSettings } from "@/context/settings-provider";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "whatsapp", label: "WhatsApp", Icon: MessageCircle },
] as const;

export function SocialLinks() {
  const { settings } = useSettings();
  const links = PLATFORMS.map(({ key, label, Icon }) => ({
    label,
    Icon,
    ...settings.social[key],
  })).filter((link) => link.visible && link.value);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      {links.map(({ label, Icon, value }) => (
        <a
          key={label}
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:scale-110 hover:border-brand-400 hover:text-brand-500 active:scale-95"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
