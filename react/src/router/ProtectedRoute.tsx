import { Navigate } from "react-router";
import { useUserContext } from "../context/UserDetailsContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userId } = useUserContext();
  if (!userId) return <Navigate to="/auth/login" />;
  return children;
}
