import { Link } from "react-router-dom";
import API_ROUTES from "../../api-routes/apiRoutes";
import { Product } from "../../types/productInterface";
import { formatPrice } from "../../utils/priceFormat";

export default function ProductSearchResultsListPreview({
  products,
  closeDropdown,
}: {
  products: Array<Product> | undefined;
  closeDropdown: () => void;
}) {
  return (
    <ul className="absolute z-10 w-full divide-y rounded-lg border bg-white p-3 px-5 sm:w-2/3">
      {products?.map((product) => (
        <Link
          onClick={closeDropdown}
          to={`product/${product.id}`}
          className="flex cursor-pointer items-center justify-between p-3 hover:bg-zinc-50"
        >
          <div className="flex w-full space-x-5 font-semibold text-gray-800">
            <h2 className="w-1/2 hover:underline"> {product.name}</h2>
            <span>{formatPrice(product.price)}</span>
          </div>
          <div
            className="h-12 w-12 bg-cover bg-center"
            style={{
              backgroundImage: `url("${API_ROUTES.base}/${API_ROUTES.productImage.download(product.images[0]?.id)}")`,
            }}
          />
        </Link>
      ))}
    </ul>
  );
}
