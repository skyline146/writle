import 'server-only';

import { cookies } from 'next/headers';
import { setSessionCookies, refreshSession } from '../session';
import { checkSessionStatus } from './check-session-status';

export const fetchWithCredentials = async (
  url: string,
  init: FetchRequestInit,
) => {
  const accessToken = cookies().get('accessToken')?.value;
  const sessionId = cookies().get('sessionId')?.value;

  const sessionStatus = checkSessionStatus({ accessToken, sessionId });

  switch (sessionStatus) {
    case 'none': {
      return null;
    }
    case 'expired': {
      setSessionCookies(await refreshSession());
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
