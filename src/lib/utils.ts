import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatters: Record<string, Intl.NumberFormat> = {};

export function formatPrice(price: number, currency: string = "TRY") {
  if (!priceFormatters[currency]) {
    priceFormatters[currency] = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  }
  return priceFormatters[currency].format(price);
}
