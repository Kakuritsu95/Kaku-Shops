import API_ROUTES from "../api-routes/apiRoutes";
import httpActions from "./httpActions";

export default {
  getById: (orderId: number) =>
    httpActions.get(API_ROUTES.order.getById(orderId)),
  getByUserId: (orderId: number) =>
    httpActions.get(API_ROUTES.order.getByUserId(orderId)),
  placeOrder: () => httpActions.post(API_ROUTES.order.placeOrder),
};
