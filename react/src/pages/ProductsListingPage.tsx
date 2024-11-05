import MobileFilterSection from "../features/product/MobileFilterSection";
import ProductFilterSection from "../features/product/ProductFilterSortSection";
import ProductsDisplay from "../features/product/ProductsDisplay";

export default function ProductsListingPage() {
  return (
    <div className="flex gap-5">
      <aside className="hidden md:block md:translate-x-0">
        <ProductFilterSection />
      </aside>
      <MobileFilterSection />
      <ProductsDisplay />
    </div>
  );
}
