'use server';

import { API_URLS } from '@/features/shared/config';
import { fetchWithCredentials } from '@/features/shared/lib/fetch-with-credentials';
import { UserSettings } from '@posts-app/types';
import { revalidateTag } from 'next/cache';

export async function updateUserData(data: UserSettings) {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => {
    if (!value) {
      formData.append(key, '');
    } else {
      formData.append(key, value);
    }
  });

  await fetchWithCredentials(API_URLS.USERS.CURRENT, {
    method: 'PATCH',
    body: formData,
  });

  revalidateTag('currentUser');
}
