import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import orderService from "../service/orderService";
import { Order } from "../types/orderInterface";

import OrderConfirmationDetails from "../features/order/OrderConfirmationDetails";
import { addDaysToDate } from "../utils/dateFormat";

import OrderProgressStepper from "../features/order/OrderProgressStepper";

export default function OrderProgressPage() {
  const { orderRefCode = "" } = useParams();
  const { data: order } = useQuery<Order>({
    queryKey: ["order", orderRefCode],
    queryFn: () => orderService.getByRefCode(orderRefCode),
  });

  if (order)
    return (
      <div className="mt-14 space-y-5 rounded py-10 sm:bg-slate-50 sm:p-10">
        <div>
          <div className="flex flex-col justify-between gap-1 text-sm font-semibold sm:flex-row">
            <div className="space-y-0.5">
              <h2 className="text-gray-400">INFO ABOUT YOUR ORDER</h2>
              <span className="block font-semibold">#{order.refCode}</span>
            </div>
            <span className="text-xs text-gray-600 md:text-sm">
              Estimated arrival: {addDaysToDate(order.orderDate, 30)}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-8 xl:flex-row">
          <div className="w-full xl:w-1/4">
            <OrderConfirmationDetails address={order.address} />
          </div>
          <OrderProgressStepper orderStatus={order.orderStatus} />
        </div>
      </div>
    );
}
