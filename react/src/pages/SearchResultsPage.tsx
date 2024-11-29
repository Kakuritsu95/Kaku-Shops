import { useSearchParams } from "react-router-dom";
import MobileFilterSection from "../features/product/MobileFilterSection";
import ProductFilterSection from "../features/product/ProductFilterSortSection";
import ProductsDisplay from "../features/product/ProductsDisplay";

import { SearchProductsResult } from "../types/productInterface";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/productService";
import { useState } from "react";

export default function ProductsListingPage() {
  const [searchParams] = useSearchParams();
  const [isFilterSectionOpen, setIsFilterSectionOpen] =
    useState<boolean>(false);
  const { data: products, isLoading } = useQuery<SearchProductsResult>({
    queryKey: [...Array.from(searchParams.entries()).sort()],
    queryFn: () =>
      productService.getSearchResultsWithFiltersBySearchParams(
        searchParams.toString(),
      ),
  });
  if (!products) return <div className="h-dvh"></div>;
  return (
    <div className="flex gap-5">
      <aside className="hidden md:block md:translate-x-0">
        <ProductFilterSection
          categories={products?.relevantCategories}
          brands={products?.relevantBrands}
        />
      </aside>

      <MobileFilterSection
        isFilterSectionOpen={isFilterSectionOpen}
        toggleOpenFilterSection={() => setIsFilterSectionOpen((open) => !open)}
        categories={products?.relevantCategories}
        brands={products?.relevantBrands}
      />

      {products && <ProductsDisplay products={products.products} />}
    </div>
  );
}
