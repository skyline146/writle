import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const friends = pgTable('friends', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstUser: uuid('first_user').references(() => users.id),
  secondUser: uuid('second_user').references(() => users.id),
  timestamp: timestamp('timestamp').defaultNow()
});
