import BeforeOrderSummary from "../features/order/BeforeOrderSummary";
import OrderInfoForm from "../features/order/OrderInfoForm";

export default function CheckoutPage() {
  return (
    <div className="flex justify-between bg-gray-50 px-10 py-14">
      <OrderInfoForm />
      <BeforeOrderSummary />
    </div>
  );
}
