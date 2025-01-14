import { Link } from "react-router-dom";
import API_ROUTES from "../../api-routes/apiRoutes";
import { CartItem } from "../../types/cartItemInterface";
import { formatPrice } from "../../utils/priceFormat";
import RemoveCartItemButton from "./RemoveCartItemButton";
import SelectCartItemQuantity from "./SelectCartItemQuantity";
import useUpdateCartItemQuantity from "../../hooks/useUpdateCartItemQuantity";
import Spinner from "../../ui/Spinner";

export default function CartItemOverviewCard({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  const totalCartItemPrice = cartItem.quantity * cartItem.unitPrice;
  const { updateCartItemQuantity, isUpdating } = useUpdateCartItemQuantity();

  return (
    <li className="flex space-x-10 border-t pt-10 sm:space-x-0">
      <div className="flex w-2/3 space-x-7">
        <div className="flex h-[12rem] w-[12rem] items-center rounded bg-gray-100">
          <div
            className="mx-auto h-[9rem] w-[9rem] bg-cover bg-center hover:cursor-pointer"
            style={{
              backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.productImage.download(cartItem.product.images?.[0].id)})`,
            }}
          />
        </div>
        <div className="flex flex-col">
          <Link
            to={`/product/${cartItem.product.id}`}
            className="font-medium text-gray-800"
          >
            {cartItem.product.name}
          </Link>
          <span>{cartItem.product.brand}</span>
          {isUpdating ? (
            <Spinner displayStart />
          ) : (
            <span className="font-semibold">
              {formatPrice(totalCartItemPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-1/3 flex-col-reverse justify-end gap-4 sm:flex-row sm:justify-between sm:gap-0">
        <SelectCartItemQuantity
          productId={cartItem.product.id}
          initialQuantity={cartItem.quantity}
          updateCartItemQuantity={updateCartItemQuantity}
        />
        <RemoveCartItemButton productId={cartItem.product.id} />
      </div>
    </li>
  );
}
