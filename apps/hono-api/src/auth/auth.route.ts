import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { verifyJwt } from '../lib/token';
import { SignInWithCredentials, SignUpWithCredentials, OAuthProvider } from '@posts-app/types';
import { sessionsService } from '../sessions';
import getProvider from './oauth-providers';
import { allowedOrigins } from '../config';
import { httpException } from '../lib/httpException';
import usersService from '../users/users.service';

const authRoute = new Hono();

// /auth/:path

authRoute.post('/sign-in', async (c) => {
  const { username, password } = await c.req.parseBody<SignInWithCredentials>();

  console.log(c.req);

  return c.text('sign in');
});

// GET: /auth/oauth2/:provider
// Creating OAuth provider authorization url
// Return: redirect to OAuth provider
authRoute.get('/oauth2/:provider', async (c) => {
  const provider = getProvider(c.req.param('provider') as OAuthProvider);

  return c.redirect(provider.getAuthorizationUrl());
});

// GET: /auth/oauth2-callback/:provider
// Callback from OAuth provider
// Return: redirect to frontend application with session
authRoute.get('/oauth2-callback/:provider', async (c) => {
  const query = c.req.query();

  if (query.error) {
    const error = encodeURIComponent(query.error);
    return c.redirect(`${allowedOrigins[0]}/auth/oauth-callback?error=${error}`);
  }

  const providerName = c.req.param('provider') as OAuthProvider;
  const provider = getProvider(providerName);

  const access_token = await provider.getAccessToken(query.code);

  const userData = await provider.getUserData(access_token);

  // console.log(userData);

  // else if (q.state !== req.session.state) { //check state value
  //   console.log('State mismatch. Possible CSRF attack');
  //   res.end('State mismatch. Possible CSRF attack');
  // }

  //check if email is presented in userData, unique field will be email, otherwise username
  const sub = (userData.email || userData.username) as string;

  const existedUser = await usersService.findOneByUsernameOrEmail(sub);

  let userId: string;
  let isNewAccount = false;
  if (!existedUser) {
    userId = await usersService.createWithOAuth(userData, providerName);
    isNewAccount = true;
    // const error = encodeURIComponent('This account has registered already');
    // return c.redirect(`${allowedOrigins[0]}/auth/oauth-callback?error=${error}`);
  } else {
    userId = existedUser.id;

    if (!existedUser.username) isNewAccount = true;
  }

  const session = await sessionsService.create({
    userId,
    sub
  });

  setCookie(c, 'user', JSON.stringify({ session, isNewAccount }));
  return c.redirect(`http://localhost:3000/auth/oauth-callback`);
});

// POST: /auth/sign-up
// Validate user's input, creating hashed password, insert user into db.
// Return: accessToken and options, sessionId
authRoute.post('/sign-up', async (c) => {
  const newUser = await c.req.json<SignUpWithCredentials>();

  if (await usersService.findOneByUsernameOrEmail(newUser.username)) {
    throw httpException(c, 400, 'Username already exists');
  }

  const createdUserId = await usersService.createWithCredentials(newUser);

  const session = await sessionsService.create({
    userId: createdUserId,
    sub: newUser.username
  });

  return c.json(session, 201);
});

// POST: /auth/sign-out
// Validating user's token, sign out, deleting session from database
// Return: 'Success'
authRoute.post('/sign-out', async (c) => {
  const sessionId = getCookie(c, 'sessionId');

  if (!sessionId) {
    throw httpException(c, 401, 'Unathorized sign out');
  }

  await sessionsService.remove(sessionId);
  return c.text('Success');
});

// GET: /auth/oauth2/:provider
// Creating OAuth provider authorization url
// Return: redirect to OAuth provider
authRoute.post('/refresh', async (c) => {
  const sessionId = getCookie(c, 'sessionId') as string;

  try {
    const currentSession = await sessionsService.remove(sessionId);

    if (currentSession.expiresIn < Date.now()) {
      throw httpException(c, 401, 'Refresh token expired');
    }

    const refreshToken = await verifyJwt(currentSession.refreshToken);

    const newSession = await sessionsService.create({
      userId: refreshToken.userId,
      sub: refreshToken.sub
    });

    return c.json(newSession);
  } catch (e) {
    throw httpException(c, 401, 'Invalid session id or refresh token');
  }
});

export { authRoute };
