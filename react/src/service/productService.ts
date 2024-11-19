import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { AddProduct, UpdateProduct } from "../types/productInterface";

export default {
  getAll: () => httpActions.get(API_ROUTES.product.getAll),
  getByCategoryIdAndSearchQuery: (categoryId: string, searchParams: string) =>
    httpActions.get(
      API_ROUTES.product.getBySearchQuery(categoryId, searchParams),
    ),
  getBySearchKeyword: (keyword: string) =>
    httpActions.get(API_ROUTES.product.getByKeyword(keyword)),
  add: (product: AddProduct) =>
    httpActions.post(API_ROUTES.product.add, product),
  getById: (productId: string) =>
    httpActions.get(API_ROUTES.product.getById(productId)),
  update: (productId: string, product: UpdateProduct) =>
    httpActions.patch(API_ROUTES.product.update(productId), product),
  delete: (productId: string) =>
    httpActions.get(API_ROUTES.product.delete(productId)),
  searchByName: (name: string) =>
    httpActions.get(API_ROUTES.product.searchByName(name)),
  searchByBrand: (brand: string) =>
    httpActions.get(API_ROUTES.product.searchByBrand(brand)),
  searchByCategory: (category: string) =>
    httpActions.get(API_ROUTES.product.searchByCategory(category)),
  searchByBrandAndName: (brand: string, productName: string) =>
    httpActions.get(
      API_ROUTES.product.searchByBrandAndName(brand, productName),
    ),
  searchByCategoryAndBrand: (category: string, brand: string) =>
    httpActions.get(
      API_ROUTES.product.searchByCategoryAndBrand(category, brand),
    ),
  getUniqueBrandsByCategoryId: (categoryId: string) =>
    httpActions.get(API_ROUTES.product.getUniqueBrands(categoryId)),
};
