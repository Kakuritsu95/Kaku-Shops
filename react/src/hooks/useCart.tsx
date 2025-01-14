import { useQuery } from "@tanstack/react-query";
import cartService from "../service/cartService";
import { Cart } from "../types/cartInterface";

export function useCart() {
  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: cartService.getByCookieId,
  });

  const totalCartItems = cart?.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const getCartItemQuantityByProductId = (productId: number) =>
    cart?.cartItems.find((cartItem) => cartItem.product.id == productId)
      ?.quantity;

  return {
    cart,
    totalCartItems,
    isLoading,
    getCartItemQuantityByProductId,
  };
}
