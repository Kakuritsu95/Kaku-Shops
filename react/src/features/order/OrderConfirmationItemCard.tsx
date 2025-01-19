import API_ROUTES from "../../api-routes/apiRoutes";
import { OrderItem } from "../../types/orderItemInterface";
import { formatPrice } from "../../utils/priceFormat";

export default function OrderConfirmationItemCard({
  orderItem,
}: {
  orderItem: OrderItem;
}) {
  return (
    <li className="flex space-x-7 py-10">
      <div
        className="h-14 w-14 bg-cover bg-center hover:cursor-pointer md:min-h-20 md:min-w-20"
        style={{
          backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.productImage.download(orderItem.product.images?.[0]?.id)})`,
        }}
      />
      <div className="flex w-1/2 flex-col justify-between">
        <h1>{orderItem.product.name}</h1>
        <div className="flex w-9 justify-center space-x-0.5 rounded border-2 border-gray-100 py-0.5 text-center text-sm">
          <span className="text-xs font-bold">x</span>
          <span>{orderItem.quantity}</span>
        </div>
      </div>
      <span className="lg:self-end">{formatPrice(orderItem.price)}</span>
    </li>
  );
}
