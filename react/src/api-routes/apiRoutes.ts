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

export const API_ROUTES = {
  base: API_BASE_URL,

  auth: {
    login: `${API_BASE_URL}/auth`,
  },

  user: {
    getUserById: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.user}/${userId}`,
    createUser: `${API_BASE_URL}/${BASE_PATHS.user}`,
    updateUser: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.user}/${userId}`,
    deleteUser: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.user}/${userId}`,
  },

  product: {
    getAll: `${API_BASE_URL}/${BASE_PATHS.product}`,
    add: `${API_BASE_URL}/${BASE_PATHS.product}`,
    getById: (id: number) => `${API_BASE_URL}/${BASE_PATHS.product}/${id}`,
    update: (id: number) => `${API_BASE_URL}/${BASE_PATHS.product}/${id}`,
    delete: (id: number) => `${API_BASE_URL}/${BASE_PATHS.product}/${id}`,
    searchByName: (productName: string) =>
      `${API_BASE_URL}/${BASE_PATHS.product}/${createSearchQuery([
        { productName },
      ])}`,
    searchByBrandAndName: (brandName: string, productName: string) =>
      `${API_BASE_URL}/${BASE_PATHS.product}/${createSearchQuery([
        { brandName },
        { productName },
      ])}`,
    searchByCategoryAndBrand: (category: string, brand: string) =>
      `${API_BASE_URL}/${BASE_PATHS.product}/${createSearchQuery([
        { category },
        { brand },
      ])}`,
  },

  image: {
    upload: `${API_BASE_URL}/${BASE_PATHS.image}/upload`,
    download: (imageId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.image}/download/${imageId}`,
    update: (imageId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.image}/download/${imageId}`,
  },

  cart: {
    getById: (cartId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cart}/total-price/${cartId}`,
    deleteCartById: (cartId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cart}/${cartId}`,
    getTotalPrice: (cartId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cart}/${cartId}`,
    getByUserId: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cart}/${userId}`,
    addItemToCart: (productId: number, quantity: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cartItem}/${createSearchQuery(
        [{ productId }, { quantity }],
        true
      )}`,
    removeItemToCart: (cartId: number, productId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cartItem}/${createSearchQuery(
        [{ cartId }, { productId }],
        true
      )}`,
    updateItemQuantity: (cartId: number, productId: number, quantity: number) =>
      `${API_BASE_URL}/${BASE_PATHS.cartItem}/${createSearchQuery(
        [{ cartId }, { productId }, { quantity }],
        true
      )}`,
  },

  category: {
    getAll: `${API_BASE_URL}/${BASE_PATHS.category}`,
    getById: (categoryId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.category}/${categoryId}`,
    add: `${API_BASE_URL}/${BASE_PATHS.category}`,
    deleteById: (categoryId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.category}/${categoryId}`,
    searchByName: (name: string) =>
      `${API_BASE_URL}/${BASE_PATHS}/${createSearchQuery([{ name }])}`,
    updateCategory: (categoryId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.category}/${categoryId}`,
  },

  order: {
    getById: (orderId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.order}/${orderId}`,
    getByUserId: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.order}/user/${userId}`,
    placeOrder: (userId: number) =>
      `${API_BASE_URL}/${BASE_PATHS.order}/${userId}`,
  },
};

export default API_ROUTES;
