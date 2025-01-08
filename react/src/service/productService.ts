import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { AddProduct, UpdateProduct } from "../types/productInterface";

export default {
  getAll: () => httpActions.get(API_ROUTES.product.getAll),
  getById: (productId: string) =>
    httpActions.get(API_ROUTES.product.getById(productId)),
  getLatestProducts: () =>
    httpActions.get(API_ROUTES.product.getLatestProducts),
  getBestSellerProducts: () =>
    httpActions.get(API_ROUTES.product.getBestSellerProducts),
  getByCategoryIdAndSearchQuery: (categoryId: string, searchParams: string) =>
    httpActions.get(
      API_ROUTES.product.getBySearchQuery(categoryId, searchParams),
    ),
  getBySearchKeyword: (keyword: string) =>
    httpActions.get(API_ROUTES.product.getByKeyword(keyword)),
  getSearchResultsWithFiltersBySearchParams: (searchParams: string) =>
    httpActions.get(
      API_ROUTES.product.getSearchResultsWithFiltersBySearchParams(
        searchParams,
      ),
    ),
  add: (product: AddProduct) =>
    httpActions.post(API_ROUTES.product.add, product),
  update: (productId: string, product: UpdateProduct) =>
    httpActions.patch(API_ROUTES.product.update(productId), product),
  delete: (productId: string) =>
    httpActions.get(API_ROUTES.product.delete(productId)),
  getUniqueBrandsByCategoryId: (categoryId: string) =>
    httpActions.get(API_ROUTES.product.getUniqueBrands(categoryId)),
  rateProduct: (productId: number, userRating: number) =>
    httpActions.post(API_ROUTES.product.rateProduct(productId, userRating)),
};
