import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 30 }).unique().notNull(),
  password: text('password').notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  profilePicture: text('profile_picture'),
  registeredAt: timestamp('registered_at').defaultNow()
});

export const SelectUserWithoutPassword = {
  id: users.id,
  username: users.username,
  firstName: users.firstName,
  lastName: users.lastName,
  registeredAt: users.registeredAt
} as const;
