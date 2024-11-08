import { Link } from "react-router-dom";
import API_ROUTES from "../../api-routes/apiRoutes";
import { CartItem } from "../../types/cartItemInterface";
import { formatPrice } from "../../utils/priceFormat";
import RemoveCartItemButton from "./RemoveCartItemButton";
import SelectCartItemQuantity from "./SelectCartItemQuantity";

export default function CartItemOverviewCard({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  const totalCartItemPrice = cartItem.quantity * cartItem.unitPrice;
  return (
    <li className="flex border-t pt-10">
      <div className="flex w-2/3 space-x-7">
        <div className="flex h-[12rem] w-[12rem] items-center rounded bg-gray-100">
          <div
            className="mx-auto h-[9rem] w-[9rem] bg-cover bg-center hover:cursor-pointer"
            style={{
              backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.image.download(cartItem.product.images?.[0].id)})`,
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
          <span className="font-semibold">
            {formatPrice(totalCartItemPrice)}
          </span>
        </div>
      </div>
      <div className="ml-10 flex w-1/3 justify-between">
        <SelectCartItemQuantity
          productId={cartItem.product.id}
          initialQuantity={cartItem.quantity}
        />
        <RemoveCartItemButton productId={cartItem.product.id} />
      </div>
    </li>
  );
}
