import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import productService from "../service/productService";
import { Product } from "../types/productInterface";
import ProductOverviewInfo from "../features/product/ProductOverViewInfo";
import API_ROUTES from "../api-routes/apiRoutes";
import Breadcrumb from "../ui/Breadcrumb";
import cartService from "../service/cartService";

export default function ProductOverviewPage() {
  const { productId = "" } = useParams();
  const { data: product, isLoading } = useQuery<Product>({
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
      <div className="mt-14 flex w-full flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="flex h-[40rem] w-full items-center rounded-md bg-gray-100 md:w-1/2">
          <div
            className="mx-auto h-96 w-96 bg-cover bg-center"
            style={{
              backgroundImage: `url("${API_ROUTES.base}/${API_ROUTES.image.download(product.images[0]?.id)}")`,
            }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <ProductOverviewInfo product={product} />
          <button
            onClick={() => {
              cartService.addItem(product.id, 1);
            }}
            className="mt-8 w-full rounded bg-green-600 px-28 py-3.5 font-medium text-white hover:bg-green-700 md:w-auto"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
