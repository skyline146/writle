import { CustomCookieOptions } from '@posts-app/types';

type Cookie = 'access_token' | 'refresh_token';

export const cookiePeriods: Record<Cookie, number> = {
  access_token: 60 * 5,
  refresh_token: 60 * 60 * 24 * 7
};

const cookiePaths: Record<Cookie, string> = {
  access_token: '/',
  refresh_token: '/api/auth/refresh'
};

export const getCookieOptions = (name: Cookie): CustomCookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    path: cookiePaths[name],
    sameSite: 'strict',
    expires: Date.now() + cookiePeriods[name] * 1000
  };
};
