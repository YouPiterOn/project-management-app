import { ArrowLeft } from 'lucide-react';
import { Button, LinkButton } from '../../../shared/components/Button';
import { FormField } from '../../../shared/components/FormField';
import { useForm } from 'react-hook-form';
import { signUpSchema, type SignUpValues } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => navigate('/'),
  });

  return (
    <div className="w-full max-w-md bg-background rounded-xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

      <form
        onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col space-y-4 justify-center"
      >
        <FormField
          id="name"
          label="Name"
          type="text"
          register={register('name')}
          error={errors.name}
        />

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
          {isPending ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-sm text-center text-muted-foreground mt-6">
        Already have an account?{' '}
        <LinkButton to="/signin" variant="link">
          Sign in
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
