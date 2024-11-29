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

export default function ProductsListingPage() {
  const [searchParams] = useSearchParams();
  const [isFilterSectionOpen, setIsFilterSectionOpen] =
    useState<boolean>(false);
  const { categoryId = "" } = useParams();
  const categories = useCategories();
  const { data: products, isLoading } = useQuery<PagedData<Product>>({
    queryKey: [categoryId, ...Array.from(searchParams.entries()).sort()],
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
    <div className="flex gap-5">
      <aside className="hidden md:block md:translate-x-0">
        {categories && brands && (
          <ProductFilterSection categories={categories} brands={brands} />
        )}
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
      {products && <ProductsDisplay products={products} />}
    </div>
  );
}
