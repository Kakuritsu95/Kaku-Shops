import { Navigate } from "react-router";
import { useUserContext } from "../context/UserDetailsContext";
import { ReactNode } from "react";
import APP_ROUTES from "../app-routes/appRoutes";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userId } = useUserContext();
  if (!userId) return <Navigate to={APP_ROUTES.LOGIN} />;
  return children;
}
