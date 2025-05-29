import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authUserSchema, type AuthUser, type SignInValues, type SignUpValues } from '../schemas';
import { apiFetch } from '../../../shared/clients/apiClient';
import { emptySchema } from '../../../shared/schemas';

type AuthContextType = {
  user: AuthUser | null;
  isVerifying: boolean;
  signIn: (values: SignInValues) => Promise<void>;
  signUp: (values: SignUpValues) => Promise<void>;
  signOut: () => Promise<void>;
  verify: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const verify = async () => {
    setIsVerifying(true);
    try {
      const user = await authClient.verify();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    verify();

    const intervalId = setInterval(() => {
      authClient.verify()
        .then(setUser)
        .catch(() => {
          setUser(null);
        });
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const signIn = async (values: SignInValues) => {
    const user = await authClient.signIn(values);
    setUser(user);
  };

  const signUp = async (values: SignUpValues) => {
    const user = await authClient.signUp(values);
    setUser(user);
  };

  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isVerifying, signIn, signUp, signOut, verify }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const authClient = {
  async signIn(data: SignInValues): Promise<AuthUser> {
    return apiFetch('/auth/signin', authUserSchema, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async signUp(data: SignUpValues): Promise<AuthUser> {
    return apiFetch('/auth/signup', authUserSchema, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async verify(): Promise<AuthUser> {
    return apiFetch('/me', authUserSchema, {
      method: 'GET',
      credentials: 'include',
    });
  },

  async signOut(): Promise<void> {
    await apiFetch('/auth/signout', emptySchema, {
      method: 'POST',
      credentials: 'include',
    });
  },
};