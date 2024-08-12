import 'server-only';

import { cookies } from 'next/headers';
import { parseJwt } from './parse-jwt';
import { JwtPayload } from '@posts-app/types';
import { setSessionCookies } from './set-session-cookies';
import { refreshTokens } from './refresh-session';

export const fetchWithCredentials = async (
  url: string,
  init: FetchRequestInit,
) => {
  const accessToken = cookies().get('accessToken')?.value;
  const sessionId = cookies().get('sessionId')?.value;

  //check accessToken on exist or expired
  if (!accessToken) {
    //check if no session cookies are presented
    if (!sessionId) {
      throw new Error('No session tokens to fetch with');
    } else {
      setSessionCookies(await refreshTokens());
    }
  } else {
    const jwtPayload: JwtPayload = parseJwt(accessToken);

    //check if accessToken expires in less than 20 seconds
    if (jwtPayload.exp - Math.floor(Date.now() / 1000) < 20) {
      setSessionCookies(await refreshTokens());
    }
  }

  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      cookie: cookies().toString(),
    },
  });
};
