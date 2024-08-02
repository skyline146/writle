import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { allowedOrigins, port } from './config';
import { auth } from './auth';
import { users } from './users';

const app = new Hono({ strict: false }).basePath('/api');

//middlewares
app.use('*', logger());
app.use('*', prettyJSON({ space: 4 }));

// app.use(
//   '*',
//   csrf({
//     origin: process.env.ALLOWED_ORIGINS?.split(',') as string[],
//   })
// );
app.use(
  '*',
  cors({
    credentials: true,
    origin: allowedOrigins,
  }),
);

app.get('/', async (c) => {
  return c.text('Hello World!');
});

//api route groups
app.route('/auth', auth);
app.route('/users', users);

app.notFound((c) => c.json({ message: 'Endpoint not found' }, 404));

console.log(
  `Hello World! Api is running on port: ${port} and ready to accept requests!\nVisit: http://localhost:${port}/api`,
);

serve({
  fetch: app.fetch,
  port,
});
