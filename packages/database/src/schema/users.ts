import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const providerEnum = pgEnum('provider', ['credentials', 'google', 'discord']);
export const providers = providerEnum.enumValues;

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 30 }).unique(),
    password: text('password'),
    email: varchar('email', { length: 80 }).unique(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }),
    profilePicture: text('profile_picture'),
    profilePictureBlurhash: text('profile_picture_blurhash'),
    provider: providerEnum('provider').notNull().default('credentials'),
    registeredAt: timestamp('registered_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  },
  (users) => {
    return {
      usernameIdx: uniqueIndex('username_idx').on(users.username),
      emailIdx: uniqueIndex('email_idx').on(users.email)
    };
  }
);
