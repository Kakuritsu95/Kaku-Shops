import API_ROUTES from "../api-routes/apiRoutes";
import { OrderRequest } from "../types/orderInterface";
import httpActions from "./httpActions";

export default {
  getById: (orderId: string) =>
    httpActions.get(API_ROUTES.order.getById(orderId)),
  getByRefCode: (refCode: string) =>
    httpActions.get(API_ROUTES.order.getByRefCode(refCode)),
  getByUserId: (orderId: string) =>
    httpActions.get(API_ROUTES.order.getByUserId(orderId)),
  placeOrder: (orderDetails: OrderRequest) =>
    httpActions.post(API_ROUTES.order.placeOrder, orderDetails),
};
