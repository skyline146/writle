import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { allowedOrigins, port } from './config';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { responseSerialize } from './middlewares';
import { TestSchema } from '@posts-app/zod';
import { stream } from 'hono/streaming';
import { join } from 'path';

const app = new Hono({ strict: false }).basePath('/api');

//middlewares
app.use('*', logger());

// app.use(
//   '*',
//   csrf({
//     origin: allowedOrigins
//   })
// );
app.use(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.get('/', async (c) => {
  return c.text('Hello World!');
});

app.get('/test', responseSerialize(TestSchema), async (c) => {
  return c.json({
    hello: 'world',
    test: '123'
  });
});

app.get('/file', async (c) => {
  return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!');
    });
    // Pipe a readable stream.

    const file = Bun.file(join(process.cwd(), '/static/test.txt'));
    await stream.pipe(file.stream());
  });
});

//api route groups
app.route('/auth', authRouter);
app.route('/users', usersRouter);

app.notFound((c) => c.json({ message: 'Endpoint not found' }, 404));

console.log(
  `Hello World! Api is running on port: ${port} and ready to accept requests!\nVisit: http://localhost:${port}/api`
);

export default {
  fetch: app.fetch,
  port
};
