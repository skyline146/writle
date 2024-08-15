import 'server-only';

import { SessionCookies } from '@posts-app/types';
import { cookies } from 'next/headers';

export const setSessionCookies = (session: SessionCookies | null) => {
  if (!session) {
    throw new Error('Session tokens must be provided');
  }

  const { accessToken, sessionId } = session;

  cookies().set('accessToken', accessToken.value, {
    ...accessToken.options,
    sameSite: 'lax',
    expires: new Date(accessToken.options.expires),
  });

  cookies().set('sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
};
