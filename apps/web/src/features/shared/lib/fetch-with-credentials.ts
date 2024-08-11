import 'server-only';

import { cookies } from 'next/headers';

export const fetchWithCredentials = (url: string, init: FetchRequestInit) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      cookie: cookies().toString(),
    },
  });
};
