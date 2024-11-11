import { useCart } from "../../hooks/useCart";
import { Button } from "../../ui/Button";

import CartItemCostBreakdown from "../cart/CartItemCostBreakdown";
import CartPriceBreakdown from "../cart/CartPriceBreakdown";

export default function BeforeOrderSummary() {
  const { cart } = useCart();
  if (!cart) return;
  return (
    <div className="w-1/3 rounded-lg border p-10">
      <h2 className="mb-3 border-b pb-3 text-lg font-bold">Order Summary</h2>
      <ul className="mb-5 border-b">
        {cart.cartItems.map((cartItem) => (
          <CartItemCostBreakdown key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <CartPriceBreakdown totalAmount={cart.totalAmount} />
      <Button size="medium">Confirm Order</Button>
    </div>
  );
}
