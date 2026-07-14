"use client";

import { useMemo, useRef, useState } from "react";
import { Header } from "@/components/layout/header";
import { BottomNav, type NavTab } from "@/components/layout/bottom-nav";
import { SearchBar } from "@/components/menu/search-bar";
import { CategoryPills } from "@/components/menu/category-pills";
import { ProductList } from "@/components/menu/product-list";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { WifiSheetContent } from "@/components/menu/wifi-sheet-content";
import { LocationSheetContent } from "@/components/menu/location-sheet-content";
import { ReviewPopup } from "@/components/menu/review-popup";
import { SiteFooter } from "@/components/layout/site-footer";
import { useMenu } from "@/context/menu-provider";

type SheetId = "wifi" | "location" | null;

export function HomeScreen() {
  const { categories, products, isLoading } = useMenu();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [openSheet, setOpenSheet] = useState<SheetId>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr");
    return products
      .filter((product) => {
        if (!product.visible) return false;
        const matchesCategory =
          selectedCategory === "all" ||
          product.categoryId === selectedCategory;
        const matchesQuery =
          !normalizedQuery ||
          product.name.toLocaleLowerCase("tr").includes(normalizedQuery) ||
          product.description.toLocaleLowerCase("tr").includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [products, query, selectedCategory]);

  const visibleCategories = useMemo(
    () =>
      categories.filter((category) =>
        products.some(
          (product) => product.categoryId === category.id && product.visible
        )
      ),
    [categories, products]
  );

  function handleNavSelect(tab: NavTab) {
    setActiveTab(tab);
    if (tab === "home") {
      setSelectedCategory("all");
      setQuery("");
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "menu") {
      setOpenSheet(null);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "search") {
      setOpenSheet(null);
      searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      searchRef.current?.focus();
    } else if (tab === "wifi") {
      setOpenSheet("wifi");
    } else if (tab === "location") {
      setOpenSheet("location");
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col pb-24">
      <div ref={topRef} />
      <div className="mx-auto w-full max-w-2xl">
        <Header />
      </div>
      <SearchBar ref={searchRef} value={query} onChange={setQuery} />
      <div className="mx-auto w-full max-w-2xl">
        <CategoryPills
          categories={visibleCategories}
          selected={selectedCategory}
          onSelect={(id) => {
            setSelectedCategory(id);
            setActiveTab("menu");
          }}
        />
        <ProductList
          products={filteredProducts}
          categories={categories}
          isLoading={isLoading}
          groupBySubCategory={selectedCategory !== "all"}
          listKey={selectedCategory}
        />
        <SiteFooter />
      </div>
      <BottomNav active={activeTab} onSelect={handleNavSelect} />
      <BottomSheet
        open={openSheet === "wifi"}
        onClose={() => setOpenSheet(null)}
        title="WiFi Bilgileri"
      >
        <WifiSheetContent />
      </BottomSheet>
      <BottomSheet
        open={openSheet === "location"}
        onClose={() => setOpenSheet(null)}
        title="Konum"
      >
        <LocationSheetContent />
      </BottomSheet>
      <ReviewPopup />
    </div>
  );
}
