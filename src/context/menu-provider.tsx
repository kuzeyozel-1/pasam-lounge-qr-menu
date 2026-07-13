"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Category, Product } from "@/types/menu";

interface MenuData {
  categories: Category[];
  products: Product[];
}

interface MenuContextValue extends MenuData {
  isLoading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, patch: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductVisibility: (id: string) => Promise<void>;
  addCategory: (name: string, icon: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

let idCounter = 0;
function generateId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

async function saveMenu(data: MenuData) {
  const res = await fetch("/api/menu", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Menü kaydedilemedi");
}

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MenuData>({ categories: [], products: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: MenuData) => {
        if (cancelled) return;
        setData(json);
        setIsLoading(false);
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mutate = useCallback(
    async (updater: (prev: MenuData) => MenuData) => {
      let next!: MenuData;
      setData((prev) => {
        next = updater(prev);
        return next;
      });
      await saveMenu(next);
    },
    []
  );

  const addProduct = useCallback(
    (product: Omit<Product, "id">) =>
      mutate((prev) => ({
        ...prev,
        products: [...prev.products, { ...product, id: generateId("p") }],
      })),
    [mutate]
  );

  const updateProduct = useCallback(
    (id: string, patch: Partial<Product>) =>
      mutate((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === id ? { ...product, ...patch } : product
        ),
      })),
    [mutate]
  );

  const deleteProduct = useCallback(
    (id: string) =>
      mutate((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product.id !== id),
      })),
    [mutate]
  );

  const toggleProductVisibility = useCallback(
    (id: string) =>
      mutate((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === id
            ? { ...product, visible: !product.visible }
            : product
        ),
      })),
    [mutate]
  );

  const addCategory = useCallback(
    (name: string, icon: string) =>
      mutate((prev) => ({
        ...prev,
        categories: [...prev.categories, { id: generateId("c"), name, icon }],
      })),
    [mutate]
  );

  const deleteCategory = useCallback(
    (id: string) =>
      mutate((prev) => ({
        categories: prev.categories.filter((category) => category.id !== id),
        products: prev.products.filter(
          (product) => product.categoryId !== id
        ),
      })),
    [mutate]
  );

  const value = useMemo<MenuContextValue>(
    () => ({
      ...data,
      isLoading,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductVisibility,
      addCategory,
      deleteCategory,
    }),
    [
      data,
      isLoading,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductVisibility,
      addCategory,
      deleteCategory,
    ]
  );

  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
