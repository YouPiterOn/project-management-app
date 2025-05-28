import { Link } from "react-router";
import { Button, LinkButton } from "./Button";
import { useAuth } from "../../features/auth/contexts/AuthContext";
import { useCallback } from "react";
import { authClient } from "../../features/auth/clients/authClient";

export function Header() {
  const { user, signOut } = useAuth();

  const onSignOut = useCallback(() => {
    authClient.signOut().then(signOut);
  }, [signOut]);

  return (
    <header className="w-full py-4 border-b">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">PM App</h1>
        </Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
            <Link to="/projects" className="text-sm hover:underline">
              My Projects
            </Link>
            <Link to="/profile" className="text-sm hover:underline">
              Profile
            </Link>
            <Button
              onClick={onSignOut}
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <LinkButton to="/signup" size="sm">Sign Up</LinkButton>
            <LinkButton to="/signin" size="sm" variant="outline">Sign In</LinkButton>
          </div>
        )}
      </div>
    </header>
  );
}
