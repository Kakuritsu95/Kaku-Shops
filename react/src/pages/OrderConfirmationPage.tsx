import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Order } from "../types/orderInterface";
import orderService from "../service/orderService";
import OrderConfirmationInfoSection from "../features/order/OrderConfirmationInfoSection";
import OrderConfirmationItemsSection from "../features/order/OrderConfirmationItemsSection";

export default function OrderConfirmationPage() {
  const { orderRefCode = "" } = useParams();
  const { data: order } = useQuery<Order>({
    queryKey: ["order", orderRefCode],
    queryFn: () => orderService.getByRefCode(orderRefCode),
  });

  if (!order) return;
  return (
    <div className="mt-16 flex flex-col gap-12 lg:flex-row">
      <OrderConfirmationInfoSection
        orderId={order.id}
        address={order.address}
      />
      <OrderConfirmationItemsSection
        orderTotalAmount={order.totalAmount}
        orderItems={order.orderItems}
      />
    </div>
  );
}
