import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  profilePicture: z.string().or(z.null())
});

export type User = z.infer<typeof UserSchema>;
