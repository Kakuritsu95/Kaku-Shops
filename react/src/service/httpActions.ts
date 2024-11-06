import axios, { InternalAxiosRequestConfig } from "axios";
import API_ROUTES from "../api-routes/apiRoutes";
axios.defaults.baseURL = API_ROUTES.base;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.method == "get") console.log(5);
  return config;
});
export default {
  get: (url: string) => axios.get(url).then((res) => res.data.data),
  post: (url: string, data?: object | string) =>
    axios.post(url, data).then((res) => res.data.data),
  put: (url: string, data: object) =>
    axios.put(url, data).then((res) => res.data.data),
  patch: (url: string, data: object | string) =>
    axios.patch(url, data).then((res) => res.data.data),
  delete: (url: string) => axios.delete(url).then((res) => res.data.data),
};
