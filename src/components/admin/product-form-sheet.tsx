"use client";

import { useState, type FormEvent } from "react";
import { Save } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { ImageUrlField } from "@/components/admin/image-url-field";
import { Switch } from "@/components/ui/switch";
import type { Category, Product } from "@/types/menu";

interface ProductFormSheetProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  product: Product | null;
  onSubmit: (values: Omit<Product, "id">, id?: string) => void;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  image: "",
  visible: true,
};

export function ProductFormSheet({
  open,
  onClose,
  categories,
  product,
  onSubmit,
}: ProductFormSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={product ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
    >
      {/* key: ürün değiştiğinde veya sheet yeniden açıldığında formu sıfırlar (React'in "resetting state" deseni). */}
      <ProductForm
        key={open ? (product?.id ?? "new") : "closed"}
        categories={categories}
        product={product}
        onSubmit={onSubmit}
      />
    </BottomSheet>
  );
}

interface ProductFormProps {
  categories: Category[];
  product: Product | null;
  onSubmit: (values: Omit<Product, "id">, id?: string) => void;
}

function ProductForm({ categories, product, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState(() =>
    product
      ? {
          name: product.name,
          description: product.description,
          price: String(product.price),
          categoryId: product.categoryId,
          image: product.image ?? "",
          visible: product.visible,
        }
      : { ...emptyForm, categoryId: categories[0]?.id ?? "" }
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim() || !form.categoryId || Number.isNaN(price)) return;
    onSubmit(
      {
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        categoryId: form.categoryId,
        image: form.image.trim() || undefined,
        visible: form.visible,
      },
      product?.id
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[65vh] flex-col gap-3 overflow-y-auto pb-2"
    >
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-foreground/60">
            Ürün Adı
          </span>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((f) => ({ ...f, name: event.target.value }))
            }
            className="rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none focus:border-brand-400"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-foreground/60">
            Ürün İçeriği / Açıklama
          </span>
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((f) => ({ ...f, description: event.target.value }))
            }
            rows={5}
            className="rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </label>
        <div className="flex gap-3">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">
              Fiyat (₺)
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={form.price}
              onChange={(event) =>
                setForm((f) => ({ ...f, price: event.target.value }))
              }
              className="rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none focus:border-brand-400"
              required
            />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="text-xs font-medium text-foreground/60">
              Kategori
            </span>
            <select
              value={form.categoryId}
              onChange={(event) =>
                setForm((f) => ({ ...f, categoryId: event.target.value }))
              }
              className="rounded-2xl border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none focus:border-brand-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ImageUrlField
          label="Görsel Linki (URL, opsiyonel)"
          value={form.image}
          onChange={(image) => setForm((f) => ({ ...f, image }))}
          placeholder="https://... veya /gorseller/urun-adi.jpg"
        />
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted px-4 py-3">
          <span className="text-sm font-medium">Müşterilere Görünür</span>
          <Switch
            checked={form.visible}
            onChange={(visible) => setForm((f) => ({ ...f, visible }))}
          />
        </div>
        <button
          type="submit"
          className="mt-1 flex items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-medium text-white shadow-glow transition-transform active:scale-[0.98]"
        >
          <Save className="h-4 w-4" />
          Kaydet
        </button>
      </form>
  );
}
