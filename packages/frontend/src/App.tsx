import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage } from './shared/pages/HomePage';
import { NotFoundPage } from './shared/pages/NotFoundPage';
import { SignUpPage } from './features/auth/pages/SignUpPage';
import { SignInPage } from './features/auth/pages/SignInPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>,
  },
  {
    path: '/signup',
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: '/signin',
    element: <SignInPage></SignInPage>,
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
