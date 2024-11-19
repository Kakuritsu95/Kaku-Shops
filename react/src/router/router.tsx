import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../ui/AppLayout";
import Homepage from "../pages/Homepage";
import ProductsListingPage from "../pages/ProductsListingPage";
import ProductOverviewPage from "../pages/ProductOverviewPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SearchResultsPage from "../pages/SearchResultsPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        element: <Navigate to={"/homepage"} />,
        path: "",
      },
      {
        element: <SearchResultsPage />,
        path: "/search",
      },
      {
        element: <Homepage />,
        path: "/homepage",
      },
      {
        path: "/products/category/:categoryId",
        element: <ProductsListingPage />,
      },
      {
        path: "/product/:productId",
        element: <ProductOverviewPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
