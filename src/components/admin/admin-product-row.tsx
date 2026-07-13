"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { CategoryIcon } from "@/components/menu/category-icon";
import { useSettings } from "@/context/settings-provider";
import type { Product } from "@/types/menu";

interface AdminProductRowProps {
  product: Product;
  categoryIcon: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisible: () => void;
}

export function AdminProductRow({
  product,
  categoryIcon,
  onEdit,
  onDelete,
  onToggleVisible,
}: AdminProductRowProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const { settings } = useSettings();
  const imageSrc = product.image || settings.general.defaultProductImage;
  const imageFailed = imageSrc !== undefined && imageSrc === erroredSrc;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-3 transition-opacity",
        !product.visible && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
          {imageSrc && !imageFailed ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="48px"
              className="object-cover"
              onError={() => setErroredSrc(imageSrc)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-400/25 to-brand-600/10 text-brand-600 dark:text-brand-400">
              <CategoryIcon icon={categoryIcon} className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-xs text-foreground/50">
            {formatPrice(product.price, settings.finance.currency)}
            {product.priceUnverified && " · onay bekliyor"}
          </p>
        </div>
        <Switch
          checked={product.visible}
          onChange={onToggleVisible}
          label="Görünürlük"
        />
      </div>
      <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-2">
        {confirmingDelete ? (
          <>
            <span className="mr-auto text-xs text-foreground/50">
              Emin misiniz?
            </span>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              Sil
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="rounded-full border border-border px-3 py-1.5 text-xs"
            >
              Vazgeç
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/70"
            >
              <Pencil className="h-3.5 w-3.5" />
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Sil
            </button>
          </>
        )}
      </div>
    </div>
  );
}
