import ProductFilterSection from "../features/product/ProductFilterSortSection";
import ProductsDisplay from "../features/product/ProductsDisplay";

export default function ProductsPage() {
  return (
    <div className="flex gap-5">
      <ProductFilterSection />
      <ProductsDisplay />
    </div>
  );
}
