import APP_ROUTES from "../../app-routes/appRoutes";
import { Order, OrderStatus } from "../../types/orderInterface";
import { Button } from "../../ui/Button";
import { formatPrice } from "../../utils/priceFormat";
import OrderHistoryOrderItemListItem from "./OrderHistoryOrderItemListItem";

export default function OrderHistoryListItem({ order }: { order: Order }) {
  return (
    <li className="divide-y rounded-md border">
      <div className="header flex flex-col gap-5 p-5 md:flex-row md:text-base lg:gap-28">
        <div className="flex flex-col">
          <span className="font-semibold">Order number</span>
          <span className="text-gray-600">{order?.refCode}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Date placed</span>
          <span className="text-gray-600">{order?.orderDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Total amount</span>
          <span className="text-gray-600">
            {formatPrice(order?.totalAmount)}
          </span>
        </div>
        <div className="ml-auto">
          <Button
            urlPath={`${APP_ROUTES.ORDER}/${order.refCode}`}
            size="small"
            color="transparent"
            type="transparent"
          >
            View order
          </Button>
        </div>
      </div>
      <ul className="divide-y p-5 py-0">
        {order.orderItems.map((orderItem) => (
          <OrderHistoryOrderItemListItem
            key={orderItem.id}
            orderItem={orderItem}
            canRateProductsInOrder={order.orderStatus == OrderStatus.DELIVERED}
          />
        ))}
      </ul>
    </li>
  );
}
