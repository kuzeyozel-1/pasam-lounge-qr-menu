"use client";

import { Clock, Globe, Mail, Map, MapPin, Phone } from "lucide-react";
import { useSettings } from "@/context/settings-provider";
import type { LucideIcon } from "lucide-react";

export function LocationSheetContent() {
  const { settings } = useSettings();
  const { header } = settings;

  const rows: {
    key: string;
    icon: LucideIcon;
    label: string;
    value: string;
    visible: boolean;
    href?: string;
  }[] = [
    {
      key: "address",
      icon: MapPin,
      label: "Adres",
      value: header.address.value,
      visible: header.address.visible,
    },
    {
      key: "workingHours",
      icon: Clock,
      label: "Çalışma Saatleri",
      value: header.workingHours.value,
      visible: header.workingHours.visible,
    },
    {
      key: "phone",
      icon: Phone,
      label: "Telefon",
      value: header.phone.value,
      visible: header.phone.visible,
      href: header.phone.value ? `tel:${header.phone.value}` : undefined,
    },
    {
      key: "email",
      icon: Mail,
      label: "E-posta",
      value: header.email.value,
      visible: header.email.visible,
      href: header.email.value ? `mailto:${header.email.value}` : undefined,
    },
    {
      key: "website",
      icon: Globe,
      label: "Web Sitesi",
      value: header.website.value,
      visible: header.website.visible,
      href: header.website.value,
    },
    {
      key: "mapLink",
      icon: Map,
      label: "Yol Tarifi",
      value: header.mapLink.value,
      visible: header.mapLink.visible,
      href: header.mapLink.value,
    },
  ];

  const visibleRows = rows.filter((row) => row.visible && row.value.trim());

  if (visibleRows.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-foreground/50">
        Konum bilgisi henüz eklenmedi.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {visibleRows.map(({ key, icon: Icon, label, value, href }) => {
        const content = (
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
            <div>
              <p className="text-xs text-foreground/50">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          </div>
        );
        return href ? (
          <a
            key={key}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block transition-opacity active:opacity-70"
          >
            {content}
          </a>
        ) : (
          <div key={key}>{content}</div>
        );
      })}
    </div>
  );
}
