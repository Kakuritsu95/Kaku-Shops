import axios from "axios";
import API_ROUTES from "../api-routes/apiRoutes";

axios.defaults.baseURL = API_ROUTES.base;
axios.defaults.withCredentials = true;
axios.defaults.headers.options?.Accept?.toString();

export default {
  get: (url: string) => axios.get(url).then((res) => res.data.data),
  post: (url: string, data?: object | string) =>
    axios.post(url, data).then((res) => res.data.data),
  put: (url: string, data: object) =>
    axios.put(url, data).then((res) => res.data.data),
  patch: (url: string, data: object | string | number) =>
    axios.patch(url, data).then((res) => res.data.data),
  delete: (url: string) => axios.delete(url).then((res) => res.data.data),
};
