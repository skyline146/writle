import { API_URLS } from '@/features/shared/config';
import { fetchWithCredentials } from '@/features/shared/lib/fetch-with-credentials';
import { User } from '@posts-app/types';
import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<User | null> {
  // console.log('getCurrentUser', cookies().getAll());

  if (!cookies().get('sessionId')) {
    return null;
  }

  const response = await fetchWithCredentials(API_URLS.USERS.CURRENT, {
    cache: 'force-cache',
    next: {
      tags: ['currentUser'],
    },
  });

  if (!response.ok) {
    // console.log(await response.json());
    return null;
  }

  const user: User = await response.json();

  return user;
}
