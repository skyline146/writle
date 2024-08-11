// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool, Client } from 'pg';
import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { config } from 'dotenv';
//relative path to database .env for /apps/api
config({ path: '../../packages/database/.env' });

// const pool = new Pool({
//   connectionString: `${process.env.DATABASE_URL}`
// });

// const client = new Client({
//   connectionString: `${process.env.DATABASE_URL}`
// });

// await client.connect();

const queryClient = postgres(`${process.env.DATABASE_URL}`);

export const db = drizzle(queryClient);
