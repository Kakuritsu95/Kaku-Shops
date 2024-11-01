import API_ROUTES from "../api-routes/apiRoutes";
import httpActions from "./httpActions";

export default {
  getAll: () => httpActions.get(API_ROUTES.category.getAll),
  getById: (categoryId: number) =>
    httpActions.get(API_ROUTES.category.getById(categoryId)),
  add: (categoryName: string) =>
    httpActions.post(API_ROUTES.category.add, categoryName),
  deleteById: (categoryId: number) =>
    httpActions.delete(API_ROUTES.category.deleteById(categoryId)),
  searchByName: (categoryName: string) =>
    httpActions.delete(API_ROUTES.category.searchByName(categoryName)),
  update: (categoryId: number, categoryName: string) =>
    httpActions.patch(
      API_ROUTES.category.updateCategory(categoryId),
      categoryName,
    ),
};
