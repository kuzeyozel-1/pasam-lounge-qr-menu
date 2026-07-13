"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import menuData from "@/data/menu.json";
import type { Category, Product } from "@/types/menu";

const STORAGE_KEY = "pasam-lounge-menu";

interface MenuData {
  categories: Category[];
  products: Product[];
}

interface MenuContextValue extends MenuData {
  isLoading: boolean;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductVisibility: (id: string) => void;
  addCategory: (name: string, icon: string) => void;
  deleteCategory: (id: string) => void;
}

const defaultData: MenuData = {
  categories: menuData.categories as Category[],
  products: menuData.products as Product[],
};

const MenuContext = createContext<MenuContextValue | null>(null);

function loadFromStorage(): MenuData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MenuData>;
    if (!parsed.categories || !parsed.products) return null;
    return parsed as MenuData;
  } catch {
    return null;
  }
}

function saveToStorage(data: MenuData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage kullanılamıyor (gizli mod/kota) - sessizce yoksay, bellek içi state çalışmaya devam eder.
  }
}

let idCounter = 0;
function generateId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MenuData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      // localStorage sadece client'ta okunabilir; SSR ile aynı ilk render'ı korumak için burada uygulanır.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(stored);
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        setData(JSON.parse(event.newValue));
      } catch {
        // ignore malformed cross-tab payload
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persist = useCallback((updater: (prev: MenuData) => MenuData) => {
    setData((prev) => {
      const next = updater(prev);
      saveToStorage(next);
      return next;
    });
  }, []);

  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      persist((prev) => ({
        ...prev,
        products: [...prev.products, { ...product, id: generateId("p") }],
      }));
    },
    [persist]
  );

  const updateProduct = useCallback(
    (id: string, patch: Partial<Product>) => {
      persist((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === id ? { ...product, ...patch } : product
        ),
      }));
    },
    [persist]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      persist((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product.id !== id),
      }));
    },
    [persist]
  );

  const toggleProductVisibility = useCallback(
    (id: string) => {
      persist((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === id
            ? { ...product, visible: !product.visible }
            : product
        ),
      }));
    },
    [persist]
  );

  const addCategory = useCallback(
    (name: string, icon: string) => {
      persist((prev) => ({
        ...prev,
        categories: [
          ...prev.categories,
          { id: generateId("c"), name, icon },
        ],
      }));
    },
    [persist]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      persist((prev) => ({
        categories: prev.categories.filter((category) => category.id !== id),
        products: prev.products.filter(
          (product) => product.categoryId !== id
        ),
      }));
    },
    [persist]
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
