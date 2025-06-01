import { Navigate } from 'react-router';
import { LoadingPage } from '../../../shared/pages/LoadingPage';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isVerifying } = useAuth();

  if (isVerifying) return <LoadingPage />;

  return user ? children : <Navigate to='/signin' replace />;
}
