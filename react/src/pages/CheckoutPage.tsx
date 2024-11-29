import { useRef, useState } from "react";
import BeforeOrderSummary from "../features/order/BeforeOrderSummary";
import { OrderInfoForm } from "../features/order/OrderInfoForm";

export default function CheckoutPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const submitOrder = () => {
    formRef?.current?.requestSubmit();
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 px-2 md:px-12 lg:flex-row lg:px-10 lg:py-14">
      <OrderInfoForm ref={formRef} onSubmitOrder={setIsSubmittingOrder} />
      <BeforeOrderSummary
        isSubmittingOrder={isSubmittingOrder}
        submitOrder={submitOrder}
      />
    </div>
  );
}
