import { OrderItem } from "../../types/orderItemInterface";
import { HiOutlineShoppingBag } from "react-icons/hi";
import OrderConfirmationItemCard from "./OrderConfirmationItemCard";
import CartItemCostBreakdown from "../cart/CartItemCostBreakdown";
import CartPriceBreakdown from "../cart/CartPriceBreakdown";
export default function OrderConfirmationItemsSection({
  orderItems,
}: {
  orderItems: Array<OrderItem>;
}) {
  return (
    <div className="w-full space-y-3 overflow-y-auto rounded-md border-gray-100 font-semibold text-gray-800 lg:w-1/2 lg:border-l-2 lg:px-9 xl:w-1/3">
      <div className="flex items-center space-x-2">
        <HiOutlineShoppingBag size={22} />
        <h2 className="text-xl">Your order</h2>
        <span className="leading-2 mt-1 rounded-full bg-black px-2 py-0.5 text-sm font-medium text-white">
          {orderItems.length}
        </span>
      </div>
      <ul className="h-96 divide-y-2 divide-gray-100 overflow-y-auto pr-5">
        {orderItems.map((orderItem) => (
          <OrderConfirmationItemCard orderItem={orderItem} />
        ))}
      </ul>
      <div className="pr-5">
        <CartPriceBreakdown totalAmount={44} />
      </div>
    </div>
  );
}
