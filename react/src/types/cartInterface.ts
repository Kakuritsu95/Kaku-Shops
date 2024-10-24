import { CartItem } from "./cartItemInterface";

export interface Cart {
  id: string;
  totalAmount: number;
  cartItems: Array<CartItem>;
}
