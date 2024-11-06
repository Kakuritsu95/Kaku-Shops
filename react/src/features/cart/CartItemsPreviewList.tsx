import { Cart } from "../../types/cartInterface";
import CardItemPreviewCard from "./CartItemPreviewCard";

export function CartItemsPreviewList({ cart }: { cart: Cart }) {
  return (
    <ul className="mt-8 space-y-6">
      {cart?.cartItems?.map((cartItem) => (
        <CardItemPreviewCard cartItem={cartItem} key={cartItem.id} />
      ))}
    </ul>
  );
}
