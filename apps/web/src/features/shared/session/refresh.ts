import 'server-only';

import { SessionCookies } from '@posts-app/types';
import { cookies } from 'next/headers';
import { API_URLS } from '../../shared/config';

export const refreshSession = async () => {
  const response = await fetch(API_URLS.AUTH.REFRESH_SESSION, {
    method: 'POST',
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    return null;
  }

  const session: SessionCookies = await response.json();

  return session;
};
