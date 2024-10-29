import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../ui/AppLayout";
import Homepage from "../pages/Homepage";
import ProductsPage from "../pages/ProductsPage";

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
        path: "/products",
        element: <ProductsPage />,
      },
    ],
  },
]);

export default router;
