"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSettings } from "@/context/settings-provider";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/menu";
import { CategoryIcon } from "./category-icon";

interface ProductCardProps {
  product: Product;
  icon: string;
}

export function ProductCard({ product, icon }: ProductCardProps) {
  const { settings } = useSettings();
  const imageSrc = product.image || settings.general.defaultProductImage;
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const imageFailed = imageSrc !== undefined && imageSrc === erroredSrc;

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    }
  }, [product.description]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-4 rounded-3xl border border-border bg-surface p-3 shadow-soft-sm"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        {imageSrc && !imageFailed ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
            onError={() => setErroredSrc(imageSrc)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-400/25 via-brand-500/15 to-brand-600/10 text-brand-600 dark:text-brand-400">
            <CategoryIcon icon={icon} className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 py-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-snug">{product.name}</h3>
          <span className="shrink-0 font-semibold text-brand-600 dark:text-brand-400">
            {formatPrice(product.price, settings.finance.currency)}
          </span>
        </div>
        {product.description && (
          <motion.p
            layout
            ref={descriptionRef}
            className={cn(
              "text-sm text-foreground/60",
              !expanded && "line-clamp-2"
            )}
          >
            {product.description}
          </motion.p>
        )}
        {isTruncated && (
          <motion.button
            layout
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="self-start text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            {expanded ? "Daralt" : "Devamını Oku"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
