import { CookieOptions } from 'hono/utils/cookie';

type Cookie = 'access_token' | 'refresh_token';

const cookiePeriods: Record<Cookie, number> = {
  access_token: 5 * 60 * 1000,
  refresh_token: 7 * 24 * 60 * 60 * 1000,
};

const cookiePaths: Record<Cookie, string> = {
  access_token: '/',
  refresh_token: '/api/auth/refresh',
};

type CustomCookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  path: string;
  sameSite: CookieOptions['sameSite'];
  expires: Date;
};

export const getCookieOptions = (name: Cookie): CustomCookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    path: cookiePaths[name],
    sameSite: 'strict',
    expires: new Date(Date.now() + cookiePeriods[name]),
  };
};
