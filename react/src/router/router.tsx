import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../ui/AppLayout";
import Homepage from "../pages/Homepage";
import ProductsListingPage from "../pages/ProductsListingPage";
import ProductOverviewPage from "../pages/ProductOverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/products/category/:categoryId",
        element: <ProductsListingPage />,
      },
      {
        path: "/product/:productId",
        element: <ProductOverviewPage />,
      },
    ],
  },
]);

export default router;
