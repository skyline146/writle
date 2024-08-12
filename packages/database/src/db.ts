import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { config } from 'dotenv';
//relative path to database .env for /apps/api
config({ path: '../../packages/database/.env' });

const queryClient = postgres(`${process.env.DATABASE_URL}`, {
  idle_timeout: 300,
  max_lifetime: null
});

export const db = drizzle(queryClient);
