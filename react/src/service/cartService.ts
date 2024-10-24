import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";

export default {
  getById: (cartId: number) =>
    httpActions.get(`${API_ROUTES.cart.getById}/${cartId}`),
  getByCookieId: () => httpActions.get(`${API_ROUTES.cart.getBySessionId}`),
  deleteById: (cartId: number) =>
    httpActions.delete(`${API_ROUTES.cart.deleteCartById}/${cartId}`),
  getTotalPrice: (cartId: number) =>
    httpActions.get(`${API_ROUTES.cart.getTotalPrice}/${cartId}`),
  getByUserId: (cartId: number) =>
    httpActions.get(`${API_ROUTES.cart.getByUserId}/${cartId}`),
  addItem: (productId: number, quantity: number) =>
    httpActions.post(
      `${API_ROUTES.cart.addItemToCart(productId, quantity)}`,
      {}
    ),
};
