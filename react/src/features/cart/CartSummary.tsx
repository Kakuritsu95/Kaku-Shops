import { Button } from "../../ui/Button";

import CartPriceBreakdown from "./CartPriceBreakdown";

export default function CartSummary({ totalAmount }: { totalAmount: number }) {
  return (
    <div className="h-[22rem] rounded-md bg-gray-50 p-9 md:w-1/3">
      <h2 className="mb-6 text-xl font-medium text-gray-900">Order summary</h2>
      <CartPriceBreakdown totalAmount={totalAmount} />
      <Button urlPath="/checkout" type="checkout" color="green" size="medium">
        Checkout
      </Button>
    </div>
  );
}
