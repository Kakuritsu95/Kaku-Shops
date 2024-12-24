import { OrderItem } from "./orderItemInterface";
import { User } from "./userInterface";

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  orderItems: Array<OrderItem>;
  refCode: string;
  address: Address;
  user: User;
}
export interface Address {
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

export enum OrderStatus {
  PENDING = "PENDING",
  PROCCESSING = "PROCCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
