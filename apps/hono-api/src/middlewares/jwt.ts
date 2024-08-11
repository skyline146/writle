import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { httpException } from '../lib/httpException';
import { verifyJwt } from '../lib/token';

export const jwtAuth = createMiddleware(async (c, next) => {
  const accessToken = getCookie(c, 'accessToken');

  if (!accessToken) {
    throw httpException(c, 401, 'Token must be provided');
  }

  try {
    const tokenPayload = await verifyJwt(accessToken);

    c.set('jwtUser', {
      id: tokenPayload.userId,
      sub: tokenPayload.sub
    });
  } catch (e) {
    throw httpException(c, 401, 'Invalid token');
  }

  await next();
});
