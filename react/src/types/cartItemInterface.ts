import { Product } from "./productInterface";

export interface CartItem {
  id: number;
  quantity: number;
  unitPrice: number;
  product: Product;
}
