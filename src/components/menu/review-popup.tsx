"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { useSettings } from "@/context/settings-provider";

const SESSION_KEY = "pasam-review-popup-shown";

export function ReviewPopup() {
  const { settings } = useSettings();
  const { reviewPopup } = settings;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!reviewPopup.enabled || !reviewPopup.googleMapsLink) return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    const timeout = setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }, Math.max(0, reviewPopup.delaySeconds) * 1000);

    return () => clearTimeout(timeout);
  }, [reviewPopup.enabled, reviewPopup.googleMapsLink, reviewPopup.delaySeconds]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="glass fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border p-6 text-center shadow-soft-lg"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Kapat"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60"
            >
              <X className="h-4 w-4" />
            </button>
            {reviewPopup.image ? (
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl">
                <Image
                  src={reviewPopup.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Star className="h-7 w-7" fill="currentColor" />
              </div>
            )}
            <h2 className="text-lg font-semibold tracking-tight">
              {reviewPopup.title}
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              {reviewPopup.description}
            </p>
            <a
              href={reviewPopup.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-medium text-white shadow-glow transition-transform active:scale-[0.98]"
            >
              <Star className="h-4 w-4" />
              Değerlendir
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
