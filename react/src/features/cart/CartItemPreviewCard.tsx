import { Link } from "react-router-dom";
import { CartItem } from "../../types/cartItemInterface";
import { MdDeleteForever } from "react-icons/md";
import API_ROUTES from "../../api-routes/apiRoutes";
import useAddRemoveCartItem from "../../hooks/useAddRemoveCartItem";

export default function CardItemPreviewCard({
  cartItem,
}: {
  cartItem: CartItem;
}) {
  const { removeCartItem } = useAddRemoveCartItem();

  return (
    <li key={cartItem.id} className="flex space-x-8 text-sm text-gray-800">
      <Link to={`/product/${cartItem.product.id}`}>
        <div
          className="h-14 w-14 bg-cover bg-center hover:cursor-pointer"
          style={{
            backgroundImage: `url(${API_ROUTES.base}/${API_ROUTES.image.download(cartItem.product.images?.[0].id)})`,
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
      <button
        onClick={() => removeCartItem(cartItem.product.id)}
        className="h-7 w-7 text-gray-600 hover:cursor-pointer hover:text-orange-600"
      >
        <MdDeleteForever className="h-full w-full" />
      </button>
    </li>
  );
}
