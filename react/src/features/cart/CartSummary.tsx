import { Button } from "../../ui/Button";
import PriceLabelBetween from "../../ui/PriceLabelBetween";

export default function CartSummary({ totalAmount }: { totalAmount: number }) {
  const shippingPriceInEur = 15;
  return (
    <div className="h-[22rem] w-1/3 rounded-md bg-gray-50 p-9">
      <h2 className="mb-6 text-xl font-medium text-gray-900">Order summary</h2>
      <div className="mb-6 space-y-5">
        <PriceLabelBetween labelName="Products price" price={totalAmount} />
        <PriceLabelBetween
          labelName="Shipping estimate"
          price={shippingPriceInEur}
        />
        <PriceLabelBetween
          labelName="Order total"
          price={shippingPriceInEur + totalAmount}
          labelBold={true}
        />
      </div>
      <Button type="checkout" color="green" size="full">
        Checkout
      </Button>
    </div>
  );
}
