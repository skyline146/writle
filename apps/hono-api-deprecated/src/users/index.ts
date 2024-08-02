import { Hono } from 'hono';

const users = new Hono();

users.get('/', (c) => {
  return c.json({ a: '123' });
});

users.get('/:id', (c) => {
  return c.json({ a: '123' });
});

users.patch('/:id', (c) => {
  return c.json({});
});

users.get('/current', (c) => {
  return c.json({ a: '123' });
});

export { users };
