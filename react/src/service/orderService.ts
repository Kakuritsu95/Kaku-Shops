import axios from "axios";
import API_ROUTES from "../api-routes/apiRoutes";

export default {
  getById: (orderId: number) => axios.get(API_ROUTES.order.getById(orderId)),
  getByUserId: (orderId: number) =>
    axios.get(API_ROUTES.order.getByUserId(orderId)),
  placeOrder: () => axios.post(API_ROUTES.order.placeOrder),
};
