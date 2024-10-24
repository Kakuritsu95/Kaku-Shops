import { OrderItem } from "./orderItemInterface";
import { User } from "./userInterface";

export interface Order {
  id: number;
  date: Date;
  totalAmount: number;
  orderStatus: OrderStatus;
  orderItems: Array<OrderItem>;
  user: User;
}

enum OrderStatus {
  PENDING = "PENDING",
  PROCCESSING = "PROCCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
