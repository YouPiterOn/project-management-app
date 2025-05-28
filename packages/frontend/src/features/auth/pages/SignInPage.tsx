import { useForm } from 'react-hook-form';
import { signInSchema, type SignInValues } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/components/FormField';
import { Button, LinkButton } from '../../../shared/components/Button';
import { ArrowLeft } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { authClient } from '../clients/authClient';

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  const { signIn } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authClient.signIn,
    onSuccess: signIn,
  });

  return (
    <div className="w-full max-w-md bg-background rounded-xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      <form
        onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col space-y-4 justify-center"
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          register={register('email')}
          error={errors.email}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          register={register('password')}
          error={errors.password}
        />

        {error && (
          <p className="text-sm text-destructive text-center">
            {error instanceof Error ? error.message : 'An unexpected error occurred.'}
          </p>
        )}

        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="text-sm text-center text-muted-foreground mt-6">
        Don't have an account?{' '}
        <LinkButton to="/signup" variant="link">
          Sign up
        </LinkButton>
      </p>

      <div className="text-center">
        <LinkButton to="/" variant="link">
          <ArrowLeft className="h-4 w-4" />
          Home
        </LinkButton>
      </div>
    </div>
  );
}
