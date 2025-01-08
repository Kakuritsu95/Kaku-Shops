import { createSearchQuery } from "../utils/urlHelpers";

const API_BASE_URL = "http://localhost:8080/api/v1";

const BASE_PATHS = {
  user: "users",
  product: "products",
  cart: "carts",
  cartItem: "cart-items",
  category: "categories",
  order: "orders",
  productImage: "product-images",
  categoryImage: "category-images",
  guestContactUs: "contact-us",
  auth: "auth",
};

const API_ROUTES = {
  base: API_BASE_URL,

  auth: {
    login: `${BASE_PATHS.auth}/login`,
    logout: `${BASE_PATHS.auth}/logout`,
    authenticateUser: `${BASE_PATHS.auth}/authenticate`,
    activateUser: (verificationToken: string) =>
      `${BASE_PATHS.auth}/activate-account/${verificationToken}`,
  },

  user: {
    getAuthenticatedUserDetails: `${BASE_PATHS.user}/details`,
    getUserById: (userId: string) => `${BASE_PATHS.user}/${userId}`,
    createUser: `${BASE_PATHS.user}`,
    updateUser: `${BASE_PATHS.user}/details`,
    changePassword: `${BASE_PATHS.user}/password`,
    deleteUser: (userId: string) => `${BASE_PATHS.user}/${userId}`,
  },

  product: {
    getAll: `${BASE_PATHS.product}`,
    getById: (id: string) => `${BASE_PATHS.product}/${id}`,
    getLatestProducts: `${BASE_PATHS.product}/latest`,
    getBestSellerProducts: `${BASE_PATHS.product}/bestSellers`,
    getBySearchQuery: (categoryId: string, searchParams: string) =>
      `${BASE_PATHS.product}/search/${categoryId}?${searchParams}`,
    getByKeyword: (keyword: string) =>
      `${BASE_PATHS.product}/search?keyword=${keyword}`,
    getSearchResultsWithFiltersBySearchParams: (searchParams: string) =>
      `${BASE_PATHS.product}/results?${searchParams}`,
    add: `${BASE_PATHS.product}`,
    update: (id: string) => `${BASE_PATHS.product}/${id}`,
    delete: (id: string) => `${BASE_PATHS.product}/${id}`,
    getUniqueBrands: (categoryId: string) =>
      `${BASE_PATHS.product}/brands/${categoryId}`,
    rateProduct: (productId: number, userRating: number) =>
      `${BASE_PATHS.product}/${productId}/rate?userRating=${userRating}`,
  },

  productImage: {
    upload: `${BASE_PATHS.productImage}/upload`,
    download: (imageId: number) =>
      `${BASE_PATHS.productImage}/download/${imageId}`,
    update: (imageId: string) => `${BASE_PATHS.productImage}/update/${imageId}`,
  },
  categoryImage: {
    upload: `${BASE_PATHS.categoryImage}/upload`,
    download: (imageId: number) =>
      `${BASE_PATHS.categoryImage}/download/${imageId}`,
    update: (imageId: string) =>
      `${BASE_PATHS.categoryImage}/update/${imageId}`,
  },

  cart: {
    getById: (cartId: string) => `${BASE_PATHS.cart}/${cartId}`,
    getBySessionId: BASE_PATHS.cart,
    deleteCartById: (cartId: string) => `${BASE_PATHS.cart}/${cartId}`,
    getTotalPrice: (cartId: string) =>
      `${BASE_PATHS.cart}/total-price/${cartId}`,
    getByUserId: (userId: string) => `${BASE_PATHS.cart}/${userId}`,
    addItemToCart: (productId: number, quantity: number) =>
      `${BASE_PATHS.cartItem}${createSearchQuery(
        [{ productId }, { quantity }],
        true,
      )}`,
    removeItemToCart: (productId: number) =>
      `${BASE_PATHS.cartItem}${createSearchQuery([{ productId }], true)}`,
    updateItemQuantity: (productId: number, quantity: number) =>
      `${BASE_PATHS.cartItem}${createSearchQuery(
        [{ productId }, { quantity }],
        true,
      )}`,
  },

  category: {
    getAll: `${BASE_PATHS.category}`,
    getById: (categoryId: string) => `${BASE_PATHS.category}/${categoryId}`,
    add: `${BASE_PATHS.category}`,
    deleteById: (categoryId: string) => `${BASE_PATHS.category}/${categoryId}`,

    updateCategory: (categoryId: string) =>
      `${BASE_PATHS.category}/${categoryId}`,
  },

  order: {
    getUserOrders: (page: string | null) =>
      `${BASE_PATHS.order}/history?page=${page}`,
    getById: (orderId: string) => `${BASE_PATHS.order}/${orderId}`,
    getByRefCode: (refCode: string) =>
      `${BASE_PATHS.order}/ref-code/${refCode}`,
    getByUserId: (userId: string) => `${BASE_PATHS.order}/user/${userId}`,
    placeOrder: BASE_PATHS.order,
  },
  contactUs: BASE_PATHS.guestContactUs,
};

export default API_ROUTES;
