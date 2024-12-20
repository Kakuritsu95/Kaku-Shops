import API_ROUTES from "../../api-routes/apiRoutes";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/productInterface";
import { Button } from "../../ui/Button";
import ProductOverviewInfo from "./ProductOverViewInfo";
import useUpdateCartItemQuantity from "../../hooks/useUpdateCartItemQuantity";
import Spinner from "../../ui/Spinner";

export default function ProductOverview({ product }: { product: Product }) {
  const { addProductToCart, isAdding } = useUpdateCartItemQuantity();
  const { getCartItemQuantityByProductId } = useCart();

  const productQuantityInCart = getCartItemQuantityByProductId(product.id);
  return (
    <div className="mt-14 flex w-full flex-col items-center gap-10 md:flex-row md:items-start">
      <div className="flex h-[40rem] w-full items-center rounded-md bg-gray-100 md:w-1/2">
        <div
          className="mx-auto h-96 w-96 bg-cover bg-center"
          style={{
            backgroundImage: `url("${API_ROUTES.base}/${API_ROUTES.productImage.download(product.images[0]?.id)}")`,
          }}
        />
      </div>
      <div className="w-full space-y-10 md:w-1/2">
        <ProductOverviewInfo product={product} />
        <Button
          onClick={() =>
            addProductToCart({ productId: product.id, quantity: 1 })
          }
        >
          {isAdding ? (
            <Spinner size={20} />
          ) : (
            <>
              {productQuantityInCart && (
                <span className="inline-block w-6 rounded-full bg-lime-200 bg-opacity-20 py-0.5 text-sm font-semibold">
                  {productQuantityInCart}
                </span>
              )}
              <span className="ml-2">Add To Cart</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
