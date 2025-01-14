import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import productService from "../service/productService";
import { Product } from "../types/productInterface";
import Breadcrumb from "../ui/Breadcrumb";
import ProductOverview from "../features/product/ProductOverview";
import Spinner from "../ui/Spinner";

export default function ProductOverviewPage() {
  const { productId = "" } = useParams();
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => productService.getById(productId),
  });
  if (isLoading) return <Spinner absoluteCenter />;
  if (!product) return null;
  return (
    <div>
      <div className="lg:ml-12">
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
      </div>
      <ProductOverview product={product} />
    </div>
  );
}
