"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-foreground/50">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

interface SettingsFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  revealable?: boolean;
}

export function SettingsField({
  label,
  revealable,
  type = "text",
  ...inputProps
}: SettingsFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const resolvedType = revealable ? (revealed ? "text" : "password") : type;

  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-medium text-foreground/60">{label}</span>
      <div className="relative">
        <input
          {...inputProps}
          type={resolvedType}
          className="w-full rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400"
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Şifreyi gizle" : "Şifreyi göster"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
          >
            {revealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </label>
  );
}

export function SettingsTextArea({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-medium text-foreground/60">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="resize-none rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400"
      />
    </label>
  );
}

export function SettingsSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-medium text-foreground/60">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SettingsToggleRow({
  label,
  visible,
  value,
  onToggle,
  onValueChange,
  placeholder,
}: {
  label: string;
  visible: boolean;
  value: string;
  onToggle: (visible: boolean) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-muted p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <Switch checked={visible} onChange={onToggle} label={label} />
      </div>
      <input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-brand-400",
          !visible && "opacity-50"
        )}
      />
    </div>
  );
}
