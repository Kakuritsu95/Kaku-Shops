import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartService from "../service/cartService";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
interface AddItemParamProps {
  productId: number;
  quantity: number;
}
export default function useAddRemoveCartItem() {
  const queryClient = useQueryClient();
  const { mutate: removeCartItem } = useMutation({
    mutationFn: (productId: number) =>
      cartService.removeItemFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast("Product removed from cart", {
        icon: (
          <RiDeleteBin6Fill
            className="animate-shake text-[#2dd22d]"
            size={22}
          />
        ),
      });
    },
  });
  const { mutate: addProductToCart } = useMutation({
    mutationFn: ({ productId, quantity }: AddItemParamProps) =>
      cartService.addItem({ productId, quantity }),
    onSuccess: () => {
      toast.success("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { removeCartItem, addProductToCart };
}
