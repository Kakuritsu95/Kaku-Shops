import { useQuery } from "@tanstack/react-query";
import orderService from "../service/orderService";
import { Order } from "../types/orderInterface";

import OrderHistoryListItem from "../features/order/OrderHistoryListItem";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PagedData } from "../types/PagedData";

export default function OrderHistoryPage() {
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page");

  const { data: orders } = useQuery<PagedData<Order>>({
    queryKey: ["userOrders", pageNum],
    queryFn: () => orderService.getUserOrderHistory(pageNum),
  });

  if (orders)
    return (
      <div>
        <h1 className="mt-10 text-3xl font-bold">Order history</h1>
        <span className="my-3 block text-gray-600">
          Check the status of recent orders.
        </span>
        <ul className="space-y-20">
          {orders.content.map((order) => (
            <OrderHistoryListItem order={order} />
          ))}
        </ul>
        <Pagination
          totalPages={orders.totalPages}
          currentPage={orders.pageable.pageNumber + 1}
          siblingsCount={2}
        />
      </div>
    );
}
