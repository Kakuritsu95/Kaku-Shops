import { CartItem } from "../../types/cartItemInterface";
import CartItemOverviewCard from "./CartItemOverviewCard";

export default function CartOverview({
  cartItems,
}: {
  cartItems: Array<CartItem>;
}) {
  return (
    <ul className="mb-16 space-y-12 md:w-2/3">
      {cartItems.map((cartItem) => (
        <CartItemOverviewCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </ul>
  );
}
