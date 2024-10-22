import axios from "axios";
import API_ROUTES from "../api-routes/apiRoutes";
axios.defaults.baseURL = API_ROUTES.base;

export default {
  get: (url: string) => axios.get(url).then((res) => res.data.data),
  post: (url: string, data: object) =>
    axios.post(url, data).then((res) => res.data.data),
  put: (url: string, data: object) =>
    axios.put(url, data).then((res) => res.data.data),
  patch: (url: string, data: object) =>
    axios.patch(url, data).then((res) => res.data.data),
  delete: (url: string) => axios.delete(url).then((res) => res.data.data),
};
