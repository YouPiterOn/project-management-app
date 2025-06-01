import { Link } from 'react-router';
import { Button, LinkButton } from './Button';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full py-4 border-b">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">PM App</h1>
        </Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <LinkButton to="/dashboard" size="sm" variant="link">
              Dashboard
            </LinkButton>
            <LinkButton to="/projects" size="sm" variant="link">
              Projects
            </LinkButton>
            <Button onClick={signOut} size="sm">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <LinkButton to="/signup" size="sm">
              Sign Up
            </LinkButton>
            <LinkButton to="/signin" size="sm" variant="outline">
              Sign In
            </LinkButton>
          </div>
        )}
      </div>
    </header>
  );
}
