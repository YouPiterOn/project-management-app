import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router';
import { HomePage } from './shared/pages/HomePage';
import { NotFoundPage } from './shared/pages/NotFoundPage';
import { SignUpPage } from './features/auth/pages/SignUpPage';
import { SignInPage } from './features/auth/pages/SignInPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { HeaderLayout } from './shared/components/HeaderLayout';
import { DefaultLayout } from './shared/components/DefaultLayout';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <HeaderLayout>
            <Outlet />
          </HeaderLayout>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/projects" element={<ProjectListPage />} />
        </Route>
      </Route>

      <Route
        element={
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        }
      >
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>,
  ),
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
