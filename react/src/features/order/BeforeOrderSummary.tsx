import { useCart } from "../../hooks/useCart";
import { Button } from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import CartItemCostBreakdown from "../cart/CartItemCostBreakdown";
import CartPriceBreakdown from "../cart/CartPriceBreakdown";

export default function BeforeOrderSummary({
  submitOrder,
  isSubmittingOrder,
}: {
  submitOrder: () => void;
  isSubmittingOrder: boolean;
}) {
  const { cart } = useCart();
  if (!cart) return;
  return (
    <div className="w-full rounded-lg border bg-white p-10 lg:w-1/3">
      <h2 className="mb-3 border-b pb-3 text-lg font-bold">Order Summary</h2>
      <ul className="mb-5 border-b">
        {cart.cartItems.map((cartItem) => (
          <CartItemCostBreakdown key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <CartPriceBreakdown totalAmount={cart.totalAmount} />
      <Button
        onClick={submitOrder}
        isSubmitting={isSubmittingOrder}
        size="medium"
      >
        {isSubmittingOrder ? <Spinner size={24} /> : <span>Confirm order</span>}
      </Button>
    </div>
  );
}
