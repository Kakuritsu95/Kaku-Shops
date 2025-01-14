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
import PageNotFound from "../pages/PageNotFound";
import APP_ROUTES from "../app-routes/appRoutes";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        element: <Navigate to={APP_ROUTES.HOME_PAGE} />,
        path: "",
      },
      {
        element: <Homepage />,
        path: APP_ROUTES.HOME_PAGE,
      },
      {
        element: <OrderConfirmationPage />,
        path: `${APP_ROUTES.ORDER}/:orderRefCode`,
      },
      {
        element: <SearchResultsPage />,
        path: APP_ROUTES.SEARCH,
      },
      {
        path: `${APP_ROUTES.PRODUCT_LISTING}/:categoryId`,
        element: <ProductsListingPage />,
      },
      {
        path: `${APP_ROUTES.PRODUCT_OVERVIEW}/:productId`,
        element: <ProductOverviewPage />,
      },
      {
        path: APP_ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: APP_ROUTES.CHECKOUT,
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: APP_ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: APP_ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: `${APP_ROUTES.ACCOUNT_VERIFICATION}/:verificationToken`,
        element: <AccountVerificationPage />,
      },
      {
        path: APP_ROUTES.CONTACT_US,
        element: <ContactUsPage />,
      },
      {
        path: APP_ROUTES.ORDER_HISTORY,
        element: <OrderHistoryPage />,
      },
      {
        path: APP_ROUTES.ORDER_SEARCH,
        element: <OrderSearchPage />,
      },
      {
        path: `${APP_ROUTES.ORDER_PROGRESSS}/:orderRefCode`,
        element: <OrderProgressPage />,
      },
      {
        path: APP_ROUTES.ACCOUNT,
        element: <AccountSettingsPage />,
        children: [
          {
            path: "",
            element: <Navigate to={APP_ROUTES.ACCOUNT_DETAILS} />,
          },
          {
            path: APP_ROUTES.ACCOUNT_DETAILS,
            element: <UserDetailsSettingsForm />,
          },
          {
            path: APP_ROUTES.ACCOUNT_ADDRESS,
            element: <UserAddressSettingsForm />,
          },
          {
            path: APP_ROUTES.ACCOUNT_PASSWORD,
            element: <UserChangePasswordForm />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
