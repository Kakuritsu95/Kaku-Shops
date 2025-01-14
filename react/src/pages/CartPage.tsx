import { Link } from "react-router-dom";
import CartSummary from "../features/cart/CartSummary";
import { useCart } from "../hooks/useCart";
import Spinner from "../ui/Spinner";
import CartOverviewList from "../features/cart/CartOverviewList";
import APP_ROUTES from "../app-routes/appRoutes";

export default function CartPage() {
  const { cart, isLoading } = useCart();

  if (isLoading) return <Spinner absoluteCenter={true} />;

  if (!cart || cart?.cartItems.length == 0)
    return (
      <div className="fl mx-auto flex flex-col text-center text-xl font-semibold">
        <span>Your cart is currently empty, start adding products!</span>
        <Link
          to={`${APP_ROUTES.PRODUCT_LISTING}/1`}
          className="mt-2 text-blue-500"
        >
          Go to store
        </Link>
      </div>
    );
  return (
    <div>
      <h2 className="mb-10 text-3xl font-bold">Your Shopping Cart</h2>
      <div className="flex flex-col md:flex-row md:space-x-16">
        <CartOverviewList cartItems={cart.cartItems} />
        <CartSummary totalAmount={cart.totalAmount} />
      </div>
    </div>
  );
}
