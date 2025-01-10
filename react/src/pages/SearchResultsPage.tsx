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
  const { data: searchResults } = useQuery<SearchProductsResult>({
    queryKey: ["searchResults", ...Array.from(searchParams.entries()).sort()],
    queryFn: () =>
      productService.getSearchResultsWithFiltersBySearchParams(
        searchParams.toString(),
      ),
  });

  return (
    <div>
      <div className="flex gap-10">
        <aside className="hidden w-72 md:block md:translate-x-0">
          <ProductFilterSection
            categories={searchResults?.relevantCategories}
            brands={searchResults?.relevantBrands}
          />
        </aside>

        <MobileFilterSection
          isFilterSectionOpen={isFilterSectionOpen}
          toggleOpenFilterSection={() =>
            setIsFilterSectionOpen((open) => !open)
          }
          categories={searchResults?.relevantCategories}
          brands={searchResults?.relevantBrands}
        />

        {
          <ProductsDisplay
            products={searchResults?.products}
            breadCrumpRouteName={searchParams.get("keyword")}
          />
        }
      </div>
      {searchResults && (
        <Pagination
          totalPages={searchResults.products.totalPages}
          currentPage={searchResults.products.pageable.pageNumber + 1}
        />
      )}
    </div>
  );
}
