import { useSearchParams } from "react-router-dom";
import MobileFilterSection from "../features/product/MobileFilterSection";
import ProductFilterSection from "../features/product/ProductFilterSortSection";
import ProductsDisplay from "../features/product/ProductsDisplay";

import { SearchProductsResult } from "../types/productInterface";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/productService";
import { useState } from "react";
import Pagination from "../ui/Pagination";

export default function ProductsListingPage() {
  const [searchParams] = useSearchParams();
  const [isFilterSectionOpen, setIsFilterSectionOpen] =
    useState<boolean>(false);
  const { data: searchResult, isLoading } = useQuery<SearchProductsResult>({
    queryKey: [...Array.from(searchParams.entries()).sort()],
    queryFn: () =>
      productService.getSearchResultsWithFiltersBySearchParams(
        searchParams.toString(),
      ),
  });
  if (!searchResult) return <div className="h-dvh"></div>;
  return (
    <div>
      <div className="flex gap-20">
        <aside className="hidden md:block md:translate-x-0">
          <ProductFilterSection
            categories={searchResult?.relevantCategories}
            brands={searchResult?.relevantBrands}
          />
        </aside>

        <MobileFilterSection
          isFilterSectionOpen={isFilterSectionOpen}
          toggleOpenFilterSection={() =>
            setIsFilterSectionOpen((open) => !open)
          }
          categories={searchResult?.relevantCategories}
          brands={searchResult?.relevantBrands}
        />

        {searchResult && (
          <ProductsDisplay
            products={searchResult.products}
            breadCrumpRouteName={searchParams.get("keyword")}
          />
        )}
      </div>
      <Pagination
        totalPages={searchResult.products.totalPages}
        currentPage={searchResult.products.pageable.pageNumber + 1}
      />
    </div>
  );
}
