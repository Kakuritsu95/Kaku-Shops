import { CartItem } from "./cartItemInterface";

export interface OrderItem extends Omit<CartItem, "unitPrice"> {
  price: number;
}
