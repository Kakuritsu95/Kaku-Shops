import { useParams, useSearchParams } from "react-router-dom";
import MobileFilterSection from "../features/product/MobileFilterSection";
import ProductFilterSection from "../features/product/ProductFilterSortSection";
import ProductsDisplay from "../features/product/ProductsDisplay";
import { PagedData } from "../types/PagedData";
import { Product } from "../types/productInterface";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/productService";
import useCategories from "../hooks/useCategories";
import { useState } from "react";
import Pagination from "../ui/Pagination";

export default function ProductsListingPage() {
  const [searchParams] = useSearchParams();
  const [isFilterSectionOpen, setIsFilterSectionOpen] =
    useState<boolean>(false);
  const { categoryId = "" } = useParams();
  const categories = useCategories();
  const { data: searchResults } = useQuery<PagedData<Product>>({
    queryKey: [
      "productsListing",
      categoryId,
      ...Array.from(searchParams.entries()).sort(),
    ],
    queryFn: () =>
      productService.getByCategoryIdAndSearchQuery(
        categoryId,
        searchParams.toString(),
      ),
  });
  const { data: brands } = useQuery<Array<string>>({
    queryKey: [categoryId, "brands"],
    queryFn: () =>
      productService.getUniqueBrandsByCategoryId(String(categoryId)),
  });

  return (
    <div>
      <div className="flex gap-10">
        <aside className="hidden w-72 md:block md:translate-x-0">
          {<ProductFilterSection categories={categories} brands={brands} />}
        </aside>
        {
          <MobileFilterSection
            isFilterSectionOpen={isFilterSectionOpen}
            toggleOpenFilterSection={() =>
              setIsFilterSectionOpen((open) => !open)
            }
            categories={categories}
            brands={brands}
          />
        }
        {searchResults && (
          <ProductsDisplay
            breadCrumpRouteName={searchResults.content[0].category.name}
            products={searchResults}
          />
        )}
      </div>
      {searchResults && (
        <Pagination
          totalPages={searchResults?.totalPages}
          currentPage={searchResults?.pageable?.pageNumber + 1}
        />
      )}
    </div>
  );
}
