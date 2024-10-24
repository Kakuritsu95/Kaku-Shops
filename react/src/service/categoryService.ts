import axios from "axios";
import API_ROUTES from "../api-routes/apiRoutes";

export default {
  getAll: () => axios.get(API_ROUTES.category.getAll),
  getById: (categoryId: number) =>
    axios.get(API_ROUTES.category.getById(categoryId)),
  add: (categoryName: string) =>
    axios.post(API_ROUTES.category.add, categoryName),
  deleteById: (categoryId: number) =>
    axios.delete(API_ROUTES.category.deleteById(categoryId)),
  searchByName: (categoryName: string) =>
    axios.delete(API_ROUTES.category.searchByName(categoryName)),
  update: (categoryId: number, categoryName: string) =>
    axios.patch(API_ROUTES.category.updateCategory(categoryId), categoryName),
};
