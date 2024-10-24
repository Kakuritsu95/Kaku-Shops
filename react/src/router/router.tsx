import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../ui/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <div>Hi guys</div>,
      },
    ],
  },
]);

export default router;
