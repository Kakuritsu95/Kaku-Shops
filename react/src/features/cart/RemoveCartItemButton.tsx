import { MdDeleteForever } from "react-icons/md";
import useUpdateCartItemQuantity from "../../hooks/useUpdateCartItemQuantity";
import Spinner from "../../ui/Spinner";

export default function RemoveCartItemButton({
  productId,
}: {
  productId: number;
}) {
  const { removeCartItem, isRemoving } = useUpdateCartItemQuantity();
  {
    return isRemoving ? (
      <Spinner displayStart />
    ) : (
      <button
        onClick={() => removeCartItem(productId)}
        className="h-7 w-10 text-gray-600 hover:cursor-pointer hover:text-orange-600 md:h-7 md:w-7"
      >
        <MdDeleteForever className="h-full w-full" />
      </button>
    );
  }
}
