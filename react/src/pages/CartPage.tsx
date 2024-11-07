import CartOverview from "../features/cart/CartOverview";
import CartSummary from "../features/cart/CartSummary";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart } = useCart();
  if (!cart) return;
  return (
    <div>
      <h2 className="mb-10 text-3xl font-bold">Your Shopping Cart</h2>
      <div className="flex">
        <CartOverview cartItems={cart?.cartItems} />
        <CartSummary />
      </div>
    </div>
  );
}
