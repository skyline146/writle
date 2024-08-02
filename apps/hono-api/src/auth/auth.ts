import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { db, sessions, users } from '@posts-app/database';
import { v4 as uuid } from 'uuid';
import { getHashedPassword } from '../lib/get-hashed-password';
import { signJwt } from '../lib/token';
import { getCookieOptions } from '../lib/get-cookie-options';

const auth = new Hono();

// /auth/:path

auth.use('/refresh', async (c, next) => {
  const refreshToken = getCookie(c, 'refresh_token');
  await next();
});

auth.post('/sign-in', async (c) => {
  const { username, password } = await c.req.parseBody<{
    username: string;
    password: string;
  }>();

  console.log(c.req);

  return c.text('sign in');
});

type CreateUser = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

// POST: /auth/sign-up Validate user's input, creating hashed password, insert user into db.
// Return: accessToken and options, sessionId
auth.post('/sign-up', async (c) => {
  const { username, lastName, firstName, password } = await c.req.json<CreateUser>();

  const hashedPassword = await getHashedPassword(password);

  try {
    const [user] = await db
      .insert(users)
      .values({ username, lastName, firstName, password: hashedPassword })
      .returning();

    const [accessTokenOptions, refreshTokenOptions] = [
      getCookieOptions('access_token'),
      getCookieOptions('refresh_token')
    ];

    const accessToken = await signJwt({
      sub: username,
      exp: accessTokenOptions.expires.getTime()
    });

    const refreshToken = await signJwt({
      sub: username,
      exp: refreshTokenOptions.expires.getTime()
    });

    const sessionId = uuid();

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      refreshToken,
      expiresIn: refreshTokenOptions.expires.getTime()
    });

    const response = {
      accessToken: {
        value: accessToken,
        options: accessTokenOptions
      },
      sessionId
    };

    return c.json(response, 201);
  } catch (e) {
    console.log(e);

    throw new HTTPException(400, {
      // message: 'Username already exists',
      res: c.json({ message: 'Username already exists' })
    });
  }
});

auth.post('/sign-out', (c) => {
  return c.text('sign-out');
});

auth.post('/refresh', (c) => {
  return c.text('refresh');
});

export { auth };
