import z from 'zod';

export const authUserSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  })
  .strip();

export type AuthUser = z.infer<typeof authUserSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Password must be at least 8 characters and include uppercase, lowercase and a number',
    ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
