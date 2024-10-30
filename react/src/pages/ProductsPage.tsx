import { useParams } from "react-router";
import ProductFilterSection from "../features/product/ProductFilterSortSection";

export default function ProductsPage() {
  const { categoryId } = useParams();

  return (
    <div>
      <ProductFilterSection />
    </div>
  );
}
