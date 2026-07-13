"use client";

import { motion } from "framer-motion";

export function ProductCardSkeleton() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-4 rounded-3xl border border-border bg-surface p-3"
    >
      <div className="h-24 w-24 shrink-0 rounded-2xl bg-surface-muted" />
      <div className="flex flex-1 flex-col gap-2 py-1">
        <div className="flex items-start justify-between gap-3">
          <div className="h-4 w-2/3 rounded-full bg-surface-muted" />
          <div className="h-4 w-12 shrink-0 rounded-full bg-surface-muted" />
        </div>
        <div className="h-3 w-full rounded-full bg-surface-muted" />
        <div className="h-3 w-1/2 rounded-full bg-surface-muted" />
      </div>
    </motion.div>
  );
}
