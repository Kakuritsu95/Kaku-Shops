import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import productService from "../service/productService";
import { Product } from "../types/productInterface";
import Breadcrumb from "../ui/Breadcrumb";
import ProductOverview from "../features/product/ProductOverview";

export default function ProductOverviewPage() {
  const { productId = "" } = useParams();
  const { data: product } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => productService.getById(productId),
  });
  if (!product) return null;

  return (
    <div>
      <Breadcrumb
        routes={[
          {
            name: product.category.name,
            path: `products/category/${product.category.id}`,
          },
          {
            name: product.name,
          },
        ]}
      />
      <ProductOverview product={product} />
    </div>
  );
}
