import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { LoadingPage } from "../../../shared/pages/LoadingPage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isVerifying } = useAuth();

  if (isVerifying) return <LoadingPage />;

  return user ? children : <Navigate to="/signin" replace />;
}