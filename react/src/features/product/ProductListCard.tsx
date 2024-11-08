import { Link } from "react-router-dom";
import { Product } from "../../types/productInterface";
import API_ROUTES from "../../api-routes/apiRoutes";

export default function ProductListCard({ product }: { product: Product }) {
  return (
    <li className="w-full sm:w-[48%] lg:w-[32%]">
      <div className="flex h-[25rem] items-center rounded-md bg-gray-100">
        <div
          className="size mx-auto h-64 w-64 bg-cover bg-center duration-300"
          style={{
            backgroundImage: `url("${API_ROUTES.base}/${API_ROUTES.productImage.download(product.images[0]?.id)}")`,
          }}
        />
      </div>
      <div className="my-2 flex flex-col space-y-1">
        <Link
          to={`/product/${product.id}`}
          className="font-semibold tracking-wide underline-offset-2 hover:underline"
        >
          {product.name}
        </Link>
        <span>Made by {product.brand}</span>
        <span className="text-lg font-bold">{product.price} €</span>
      </div>
    </li>
  );
}
