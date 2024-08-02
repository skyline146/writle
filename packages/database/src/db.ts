import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from 'dotenv';

//relative path to database .env for /apps/api
config({ path: '../../packages/database/.env' });

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`
});

export const db = drizzle(pool);
