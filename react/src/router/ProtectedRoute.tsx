import { Navigate } from "react-router";
import { useUserDetails } from "../context/UserDetailsContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userId } = useUserDetails();
  if (!userId) return <Navigate to="/auth/login" />;
  return children;
}
