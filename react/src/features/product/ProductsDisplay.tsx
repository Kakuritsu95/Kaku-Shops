import ProductList from "./ProductList";
import { Product } from "../../types/productInterface";

import { PagedData } from "../../types/PagedData";

import Breadcrumb from "../../ui/Breadcrumb";

export default function ProductsDisplay({
  searchResults,
  breadCrumpRouteName,
  isLoadingProducts,
}: {
  searchResults: PagedData<Product> | undefined;
  breadCrumpRouteName: string | null | undefined;
  isLoadingProducts: boolean;
}) {
  const selectedCategory = searchResults?.content[0]?.category.name;

  if (
    (!searchResults || searchResults.content.length == 0) &&
    !isLoadingProducts
  )
    return (
      <p className="text-center font-semibold text-gray-700">
        No products available for the given filters
      </p>
    );
  else
    return (
      <div className="w-full space-y-7">
        {breadCrumpRouteName && (
          <Breadcrumb routes={[{ name: breadCrumpRouteName }]} />
        )}
        <div className="divide- flex items-center gap-2.5">
          <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
          <div className="ml-1 mt-1 h-6 border-l border-gray-300" />
          <span className="mt-1.5">
            {searchResults?.totalElements} products
          </span>
        </div>
        <ProductList
          products={searchResults?.content}
          isLoadingProducts={isLoadingProducts}
        />
      </div>
    );
}
