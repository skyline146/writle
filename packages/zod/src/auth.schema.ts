import { z } from 'zod';

import { UserSchema } from './user.schema';

export const SignInWithCredentialsSchema = UserSchema.pick({ username: true, password: true });

export const SignUpWithCredentialsSchema = UserSchema.pick({
  firstName: true,
  lastName: true
}).merge(SignInWithCredentialsSchema);

export const SignUpWithConfirmPasswordSchema = SignUpWithCredentialsSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});