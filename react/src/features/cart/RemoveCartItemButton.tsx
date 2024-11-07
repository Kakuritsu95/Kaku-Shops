import { MdDeleteForever } from "react-icons/md";
import useUpdateCartItemQuantity from "../../hooks/useUpdateCartItemQuantity";

export default function RemoveCartItemButton({
  productId,
}: {
  productId: number;
}) {
  const { removeCartItem } = useUpdateCartItemQuantity();
  return (
    <button
      onClick={() => removeCartItem(productId)}
      className="h-7 w-7 text-gray-600 hover:cursor-pointer hover:text-orange-600"
    >
      <MdDeleteForever className="h-full w-full" />
    </button>
  );
}
