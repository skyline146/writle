import { z } from 'zod';
import { providers, users } from '@posts-app/database/schema';

type UserDatabasePlain = typeof users.$inferSelect;

export const UserDatabaseSchema = z.object({
  id: z.string().uuid(),
  username: z.string().or(z.null()),
  password: z.string().or(z.null()),
  email: z.string().email().or(z.null()),
  firstName: z.string(),
  lastName: z.string().or(z.null()),
  provider: z.enum(providers),
  profilePicture: z.string().or(z.null()),
  registeredAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}) satisfies z.ZodType<UserDatabasePlain>;

export const UserDatabaseWithoutPasswordSchema = UserDatabaseSchema.omit({ password: true });

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, underscores and dots'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email(),
  firstName: z
    .string()
    .min(1, 'First name required')
    .max(50, 'First name must be at most 50 characters long')
    .regex(
      /^(?!.*--)[a-zA-Zа-яА-Я]+(-[a-zA-Zа-яА-Я]+)*$/,
      'First name can only contain letters, dashes and must end with letter'
    ),
  lastName: z
    .string()
    .max(50, 'Last name must be at most 50 characters long')
    .regex(
      /^(?!.*--)[a-zA-Zа-яА-Я]+(-[a-zA-Zа-яА-Я]+)*$/,
      'Last name can only contain letters, dashes and must end with letter'
    )
    .or(z.null()),
  provider: z.enum(providers),
  profilePicture: z.string().or(z.null()),
  registeredAt: z.date(),
  updatedAt: z.date()
}) satisfies z.ZodType<UserDatabasePlain>;

export const UserSettingsSchema = UserSchema.pick({
  firstName: true,
  lastName: true
}).extend({
  username: UserSchema.shape.username.or(z.null()),
  email: UserSchema.shape.email.or(z.null()),
  profilePicture: z
    .any()
    .refine((file: File) => file?.size <= 5242880, 'Media file must be less than 5 MB')
    .or(z.null())
    .or(z.undefined())
});
