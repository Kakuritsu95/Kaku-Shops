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
  const { categories, isLoadingCategories } = useCategories();
  const { data: searchResults, isLoading: isLoadingProducts } = useQuery<
    PagedData<Product>
  >({
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
  const { data: brands, isLoading: isLoadingBrands } = useQuery<Array<string>>({
    queryKey: [categoryId, "brands"],
    queryFn: () =>
      productService.getUniqueBrandsByCategoryId(String(categoryId)),
  });

  return (
    <div>
      <div className="flex gap-20">
        <aside className="hidden w-72 md:block md:translate-x-0">
          {
            <ProductFilterSection
              categories={categories}
              brands={brands}
              isLoadingCategories={isLoadingCategories}
              isLoadingBrands={isLoadingBrands}
            />
          }
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
        {searchResults && searchResults.content.length > 0 && (
          <ProductsDisplay
            breadCrumpRouteName={searchResults?.content[0].category.name}
            searchResults={searchResults}
            isLoadingProducts={isLoadingProducts}
          />
        )}
        {!searchResults ||
          (searchResults.content.length == 0 && !isLoadingProducts && (
            <p className="text-center font-semibold text-gray-700">
              No products available for the given filters
            </p>
          ))}
      </div>
      {searchResults && searchResults.content.length > 0 && (
        <Pagination
          totalPages={searchResults?.totalPages}
          currentPage={searchResults?.pageable?.pageNumber + 1}
        />
      )}
    </div>
  );
}
