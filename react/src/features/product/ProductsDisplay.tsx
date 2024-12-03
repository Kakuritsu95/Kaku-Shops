import ProductList from "./ProductList";
import { Product } from "../../types/productInterface";

import { PagedData } from "../../types/PagedData";

import Breadcrumb from "../../ui/Breadcrumb";

export default function ProductsDisplay({
  products,
  breadCrumpRouteName,
}: {
  products: PagedData<Product>;
  breadCrumpRouteName: string | null;
}) {
  const selectedCategory = products.content[0]?.category.name;
  return (
    <div className="w-full space-y-7">
      {breadCrumpRouteName && (
        <Breadcrumb routes={[{ name: breadCrumpRouteName }]} />
      )}
      <div className="divide- flex items-center gap-2.5">
        <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
        <div className="ml-1 mt-1 h-6 border-l border-gray-300" />
        <span className="mt-1.5">{products.totalElements} products</span>
      </div>
      <ProductList products={products.content} />
    </div>
  );
}
