import { useRef } from "react";
import BeforeOrderSummary from "../features/order/BeforeOrderSummary";
import { OrderInfoForm } from "../features/order/OrderInfoForm";

export default function CheckoutPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const submitOrder = () => formRef?.current?.requestSubmit();

  return (
    <div className="flex justify-between bg-gray-50 px-10 py-14">
      <OrderInfoForm ref={formRef} />
      <BeforeOrderSummary submitOrder={submitOrder} />
    </div>
  );
}
