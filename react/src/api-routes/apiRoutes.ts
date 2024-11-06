import { createSearchQuery } from "../utils/urlHelpers";

const API_BASE_URL = "http://localhost:8080/api/v1";

const BASE_PATHS = {
  user: "users",
  product: "products",
  cart: "carts",
  cartItem: "cart-items",
  category: "categories",
  order: "orders",
  image: "images",
};

const API_ROUTES = {
  base: API_BASE_URL,

  auth: {
    login: `auth`,
  },

  user: {
    getUserById: (userId: string) => `${BASE_PATHS.user}/${userId}`,
    createUser: `${BASE_PATHS.user}`,
    updateUser: (userId: string) => `${BASE_PATHS.user}/${userId}`,
    deleteUser: (userId: string) => `${BASE_PATHS.user}/${userId}`,
  },

  product: {
    getAll: `${BASE_PATHS.product}`,
    getBySearchQuery: (categoryId: string, searchParams: string) =>
      `${BASE_PATHS.product}/search/${categoryId}?${searchParams}`,
    add: `${BASE_PATHS.product}`,
    getById: (id: string) => `${BASE_PATHS.product}/${id}`,
    update: (id: string) => `${BASE_PATHS.product}/${id}`,
    delete: (id: string) => `${BASE_PATHS.product}/${id}`,
    searchByName: (productName: string) =>
      `${BASE_PATHS.product}/${createSearchQuery([{ productName }])}`,
    searchByBrand: (productBrand: string) =>
      `${BASE_PATHS.product}/${createSearchQuery([{ productBrand }])}`,
    searchByCategory: (productCategory: string) =>
      `${BASE_PATHS.product}/${createSearchQuery([{ productCategory }])}`,
    searchByBrandAndName: (brandName: string, productName: string) =>
      `${BASE_PATHS.product}/${createSearchQuery([
        { brandName },
        { productName },
      ])}`,
    searchByCategoryAndBrand: (category: string, brand: string) =>
      `${BASE_PATHS.product}/${createSearchQuery([{ category }, { brand }])}`,
    getUniqueBrands: (categoryId: string) =>
      `${BASE_PATHS.product}/brands/${categoryId}`,
  },

  image: {
    upload: `${BASE_PATHS.image}/upload`,
    download: (imageId: number) => `${BASE_PATHS.image}/download/${imageId}`,
    update: (imageId: number) => `${BASE_PATHS.image}/update/${imageId}`,
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
    updateItemQuantity: (cartId: string, productId: string, quantity: number) =>
      `${BASE_PATHS.cartItem}${createSearchQuery(
        [{ cartId }, { productId }, { quantity }],
        true,
      )}`,
  },

  category: {
    getAll: `${BASE_PATHS.category}`,
    getById: (categoryId: number) => `${BASE_PATHS.category}/${categoryId}`,
    add: `${BASE_PATHS.category}`,
    deleteById: (categoryId: number) => `${BASE_PATHS.category}/${categoryId}`,
    searchByName: (name: string) =>
      `${BASE_PATHS}/${createSearchQuery([{ name }])}`,
    updateCategory: (categoryId: number) =>
      `${BASE_PATHS.category}/${categoryId}`,
  },

  order: {
    getById: (orderId: number) => `${BASE_PATHS.order}/${orderId}`,
    getByUserId: (userId: number) => `${BASE_PATHS.order}/user/${userId}`,
    placeOrder: BASE_PATHS.order,
  },
};

export default API_ROUTES;
