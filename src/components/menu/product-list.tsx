"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Category, Product } from "@/types/menu";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductListProps {
  products: Product[];
  categories: Category[];
  isLoading?: boolean;
  groupBySubCategory?: boolean;
  listKey?: string;
}

type ListItem =
  | { type: "header"; key: string; label: string }
  | { type: "product"; key: string; product: Product };

export function ProductList({
  products,
  categories,
  isLoading,
  groupBySubCategory,
  listKey,
}: ProductListProps) {
  const iconFor = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.icon ??
    "utensils";

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 px-4 pb-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-16 text-center text-foreground/50">
        <SearchX className="h-8 w-8" />
        <p className="text-sm">Aramanızla eşleşen bir ürün bulunamadı.</p>
      </div>
    );
  }

  const distinctSubCategories = new Set(
    products.map((product) => product.subCategory).filter(Boolean)
  );
  const showHeaders = Boolean(groupBySubCategory) && distinctSubCategories.size > 1;

  const items: ListItem[] = [];
  let lastSubCategory: string | undefined;
  for (const product of products) {
    if (showHeaders && product.subCategory !== lastSubCategory) {
      items.push({
        type: "header",
        key: `header-${product.subCategory}`,
        label: product.subCategory ?? "",
      });
      lastSubCategory = product.subCategory;
    }
    items.push({ type: "product", key: product.id, product });
  }

  return (
    <motion.div
      key={listKey}
      layout
      className="flex flex-col gap-3 px-4 pb-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) =>
          item.type === "header" ? (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-1 pt-1"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/40">
                {item.label}
              </span>
              <span className="h-px flex-1 bg-border" />
            </motion.div>
          ) : (
            <ProductCard
              key={item.key}
              product={item.product}
              icon={iconFor(item.product.categoryId)}
            />
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}
