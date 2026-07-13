"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ImageUrlFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ImageUrlField({
  label,
  value,
  onChange,
  placeholder,
}: ImageUrlFieldProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-medium text-foreground/60">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-muted">
          {value && !failed ? (
            // Admin canlı önizlemesi: keyfi/geçersiz URL'ler girilebildiği için
            // next/image yerine bilinçli olarak düz <img> + onError fallback kullanılıyor.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              onError={() => setFailed(true)}
              onLoad={() => setFailed(false)}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageOff className="h-5 w-5 text-foreground/30" />
          )}
        </div>
        <input
          value={value}
          onChange={(event) => {
            setFailed(false);
            onChange(event.target.value);
          }}
          placeholder={placeholder}
          className="flex-1 rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400"
        />
      </div>
    </div>
  );
}
