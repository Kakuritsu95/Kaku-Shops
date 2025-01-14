import PriceLabelBetween from "../../ui/PriceLabelBetween";

export default function CartPriceBreakdown({
  totalAmount,
}: {
  totalAmount: number;
}) {
  const shippingPriceInEur = 15;

  return (
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
  );
}
