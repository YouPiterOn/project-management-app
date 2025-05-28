import { apiFetch } from '../../../shared/clients/apiClient';
import { emptySchema } from '../../../shared/schemas';
import { authUserSchema, type SignInValues, type AuthUser, type SignUpValues } from '../schemas';

async function signIn(data: SignInValues): Promise<AuthUser> {
  return apiFetch('/auth/signin', authUserSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function signUp(data: SignUpValues): Promise<AuthUser> {
  return apiFetch('/auth/signup', authUserSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function verify(): Promise<AuthUser> {
  return apiFetch('/me', authUserSchema, {
    method: 'GET',
    credentials: 'include'
  });
}

async function signOut(): Promise<void> {
  await apiFetch('/auth/signout', emptySchema, {
    method: 'POST',
    credentials: 'include'
  });
}

export const authClient = {
  signIn,
  signUp,
  verify,
  signOut,
};