import { CartItem } from "../../types/cartItemInterface";
import { formatPrice } from "../../utils/priceFormat";

export default function CartItemCostBreakdown({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  return (
    <li className="flex justify-between py-2">
      <h1 className="flex-1">{cartItem.product.name}</h1>
      <span className="flex-1 text-end">{cartItem.quantity}x</span>
      <span className="flex-1 text-end">
        {formatPrice(cartItem.unitPrice * cartItem.quantity)}
      </span>
    </li>
  );
}
