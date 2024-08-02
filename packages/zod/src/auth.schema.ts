import { z } from 'zod';

import { UserSchema } from './users.schema';

export const SignInSchema = UserSchema.pick({ username: true, password: true });

export const SignUpSchema = UserSchema.pick({ firstName: true, lastName: true }).merge(
  SignInSchema
);

export const SignUpWithConfirmPasswordSchema = SignUpSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

export type SignUpWithConfirmPassword = z.infer<typeof SignUpWithConfirmPasswordSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type SignIn = z.infer<typeof SignInSchema>;
