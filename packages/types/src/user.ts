import { users } from '@posts-app/database/schema';
import { UserDatabaseSchema } from '@posts-app/zod';
import z from 'zod';

export type UserDatabase = z.infer<typeof UserDatabaseSchema>;
export type User = Omit<UserDatabase, 'password'>;

export type Provider = typeof users.$inferSelect.provider;
export type OAuthProvider = Exclude<Provider, 'credentials'>;
