import axios from "axios";
import API_ROUTES from "../api-routes/apiRoutes";
import { addProduct } from "../types/productInterface";

axios.defaults.baseURL = API_ROUTES.base;

const httpActions = {
  get: (url: string) => axios.get(url).then((res) => res.data),
  post: (url: string, data: object) =>
    axios.post(url, data).then((res) => res.data),
  put: (url: string, data: object) =>
    axios.put(url, data).then((res) => res.data),
  patch: (url: string, data: object) =>
    axios.patch(url, data).then((res) => res.data),
  delete: (url: string) => axios.delete(url).then((res) => res.data),
};
export const productService = {
  getAll:()=> httpActions.get(API_ROUTES.product.getAll),
  add: (product: addProduct) =>
    httpActions.post(API_ROUTES.product.add, product),
};
