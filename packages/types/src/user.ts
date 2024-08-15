import { users } from '@posts-app/database/schema';
import { UserDatabaseSchema, UserSettingsSchema } from '@posts-app/zod';
import z from 'zod';

export type InsertUser = typeof users.$inferInsert;
export type UserDatabase = z.infer<typeof UserDatabaseSchema>;
export type User = Omit<UserDatabase, 'password'>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;

export type Provider = typeof users.$inferSelect.provider;
export type OAuthProvider = Exclude<Provider, 'credentials'>;
