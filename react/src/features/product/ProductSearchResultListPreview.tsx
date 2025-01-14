import { Link } from "react-router-dom";
import API_ROUTES from "../../api-routes/apiRoutes";
import { Product } from "../../types/productInterface";
import { formatPrice } from "../../utils/priceFormat";
import Spinner from "../../ui/Spinner";

export default function ProductSearchResultsListPreview({
  products,
  closeDropdown,
  searchKeyword,
  isSearching,
}: {
  products: Array<Product> | undefined;
  closeDropdown: () => void;
  searchKeyword: string;
  isSearching: boolean;
}) {
  return (
    <div className="absolute z-10 w-full overflow-hidden rounded-lg border bg-white p-3 px-5 sm:w-2/3">
      {isSearching ? (
        <Spinner displayStart />
      ) : products?.length == 0 && !isSearching ? (
        <h3 className="text-sm font-semibold text-gray-600">
          {`No results found for keyword`}
          <span className="text-gray-700"> "{searchKeyword}"</span>
        </h3>
      ) : (
        <ul className="divide-y">
          {products?.map((product) => (
            <Link
              onClick={closeDropdown}
              to={`product/${product.id}`}
              key={product.id}
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
      )}
    </div>
  );
}
