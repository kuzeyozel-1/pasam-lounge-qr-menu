"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Plus, Search } from "lucide-react";
import { useMenu } from "@/context/menu-provider";
import { useToast } from "@/components/ui/toast";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminProductRow } from "@/components/admin/admin-product-row";
import { ProductFormSheet } from "@/components/admin/product-form-sheet";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/menu";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const {
    categories,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
  } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const toast = useToast();

  const iconFor = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.icon ??
    "utensils";

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr");
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categoryId === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLocaleLowerCase("tr").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, query]);

  function openCreate() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function handleSubmit(values: Omit<Product, "id">, id?: string) {
    if (id) {
      updateProduct(id, values);
      toast({ title: "Ürün başarıyla güncellendi" });
    } else {
      addProduct(values);
      toast({ title: "Ürün başarıyla eklendi" });
    }
    setFormOpen(false);
  }

  function handleDelete(product: Product) {
    deleteProduct(product.id);
    toast({ title: "Ürün silindi", variant: "info" });
  }

  function handleToggle(product: Product) {
    toggleProductVisibility(product.id);
    toast({
      title: product.visible ? "Ürün gizlendi" : "Ürün görünür yapıldı",
      variant: "info",
    });
  }

  return (
    <AdminShell onLogout={onLogout}>
      <div className="mx-auto w-full max-w-2xl px-4 py-4 pb-24">
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ürün ara..."
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
              selectedCategory === "all"
                ? "border-transparent bg-brand-500 text-white"
                : "border-border text-foreground/70"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
                selectedCategory === category.id
                  ? "border-transparent bg-brand-500 text-white"
                  : "border-border text-foreground/70"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <p className="mb-2 text-xs text-foreground/40">
          {filtered.length} ürün
        </p>

        <div className="flex flex-col gap-2">
          {filtered.map((product) => (
            <AdminProductRow
              key={product.id}
              product={product}
              categoryIcon={iconFor(product.categoryId)}
              onEdit={() => openEdit(product)}
              onDelete={() => handleDelete(product)}
              onToggleVisible={() => handleToggle(product)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-foreground/50">
              Ürün bulunamadı.
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={openCreate}
        aria-label="Yeni ürün ekle"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft-lg transition-transform active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </button>

      <ProductFormSheet
        open={formOpen}
        onClose={() => setFormOpen(false)}
        categories={categories}
        product={editingProduct}
        onSubmit={handleSubmit}
      />
    </AdminShell>
  );
}
