import { Navigate } from "react-router";
import { useUserDetails } from "../context/UserDetailsContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { role } = useUserDetails();
  if (!role) return <Navigate to="/auth/login" />;
  return children;
}
