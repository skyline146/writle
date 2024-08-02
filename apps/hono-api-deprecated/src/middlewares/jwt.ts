import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';

export const jwtMiddleware = createMiddleware(async (c, next) => {
  const accessToken = getCookie(c, 'accessToken');

  if (!accessToken) {
  }

  await next();
});
