import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartService from "../service/cartService";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "../types/axiosErrorResponse";
interface UpdateItemParamProps {
  productId: number;
  quantity: number;
}
export default function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const { mutate: removeCartItem, isPending: isRemoving } = useMutation({
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
  const { mutate: addProductToCart, isPending: isAdding } = useMutation({
    mutationFn: ({ productId, quantity }: UpdateItemParamProps) =>
      cartService.addItem({ productId, quantity }),
    onSuccess: () => {
      toast.success("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const { mutate: updateCartItemQuantity, isPending: isUpdating } = useMutation<
    void,
    AxiosError<AxiosErrorResponse>,
    UpdateItemParamProps
  >({
    mutationFn: ({ productId, quantity }: UpdateItemParamProps) =>
      cartService.updateItemQuantity({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity updated!");
    },
    onError: (e: AxiosError<AxiosErrorResponse>) => {
      toast.error(
        <p className="text-sm font-semibold">
          {e?.response?.data?.message || "An unexpected error occured"}
        </p>,
      );
    },
  });

  return {
    removeCartItem,
    addProductToCart,
    updateCartItemQuantity,
    isAdding,
    isRemoving,
    isUpdating,
  };
}
