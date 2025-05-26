import { LinkButton } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-gray-500 mb-8">
            Sorry, the page you're looking for doesn’t exist.
          </p>

          <div className="flex justify-center">
            <LinkButton to="/" size="lg" variant="outline">
              <div className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                Return to Home Page
              </div>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
