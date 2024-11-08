import { Link } from "react-router-dom";
import { CartItem } from "../../types/cartItemInterface";

import API_ROUTES from "../../api-routes/apiRoutes";
import RemoveCartItemButton from "./RemoveCartItemButton";

export default function CardItemPreviewCard({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  return (
    <li key={cartItem.id} className="flex space-x-8 text-sm text-gray-800">
      <Link to={`/product/${cartItem.product.id}`}>
        <div
          className="h-14 w-14 bg-cover bg-center hover:cursor-pointer"
          style={{
            backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.productImage.download(cartItem.product.images?.[0]?.id)})`,
          }}
        />
      </Link>
      <div className="w-2/3 hover:cursor-pointer">
        <Link
          to={`/product/${cartItem.product.id}`}
          className="hover:underline"
        >
          {cartItem.product.name}
        </Link>
        <div className="flex gap-2">
          <span>Quantity:</span>
          <span className="font-semibold">{cartItem.quantity}</span>
        </div>
      </div>
      <RemoveCartItemButton productId={cartItem.product.id} />
    </li>
  );
}
