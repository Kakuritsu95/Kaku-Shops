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
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import AccountVerificationPage from "../pages/AccountVerificationPage";
import SignupPage from "../pages/SignupPage";
import ContactUsPage from "../pages/ContactUsPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import OrderProgressPage from "../pages/OrderProgressPage";
import OrderSearchPage from "../pages/OrderSearchPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import UserDetailsSettingsForm from "../features/user/UserDetailsSettingsForm";
import UserAddressSettingsForm from "../features/user/UserAddressSettingsForm";
import UserChangePasswordForm from "../features/user/UserChangePasswordForm";

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
        element: <OrderConfirmationPage />,
        path: "order/:orderRefCode",
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
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "auth/verification/:verificationToken",
        element: <AccountVerificationPage />,
      },
      {
        path: "contact",
        element: <ContactUsPage />,
      },
      {
        path: "order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "order-progress-form",
        element: <OrderSearchPage />,
      },
      {
        path: "order-progress/:orderRefCode",
        element: <OrderProgressPage />,
      },
      {
        path: "account",
        element: <AccountSettingsPage />,
        children: [
          {
            path: "",
            element: <Navigate to="details" />,
          },
          {
            path: "details",
            element: <UserDetailsSettingsForm />,
          },
          {
            path: "address",
            element: <UserAddressSettingsForm />,
          },
          {
            path: "change-password",
            element: <UserChangePasswordForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
