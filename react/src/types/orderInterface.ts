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
interface Address {
  address: string;
  city: string;
  postalCode: string;
}
export interface OrderRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  proofType: "RECEIPT" | "INVOICE";
  vatNumber?: string;
  address: Address;
}

enum OrderStatus {
  PENDING = "PENDING",
  PROCCESSING = "PROCCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
