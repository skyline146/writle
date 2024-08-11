'use server';

import { redirect } from 'next/navigation';
import {
  SignInWithCredentials,
  SignUpWithConfirmPassword,
} from '@posts-app/types';
import { SessionCookies } from '@posts-app/types';
import { setSessionCookies } from '@/features/shared/lib/set-session-cookies';
import { API_URLS } from '@/features/shared/config';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function signUp(
  userAgent: string,
  formData: SignUpWithConfirmPassword,
) {
  const { confirmPassword, ...userData } = formData;

  await fetch(API_URLS.AUTH.SIGN_UP, {
    method: 'POST',
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      const session: SessionCookies = data;

      setSessionCookies(session);

      redirect('/me/posts');
    })
    .catch((e) => {
      console.error(e);
    });
}

export async function signIn(
  userAgent: string,
  formData: SignInWithCredentials,
) {
  const response = await fetch(API_URLS.AUTH.SIGN_IN, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'user-agent': userAgent,
    },
  });

  if (!response.ok) {
    console.log(await response.text());

    return;
    // return {
    //   ...prevState,
    //   username: await response.text(),
    // };
  }

  console.log(await response.text());

  // return prevState;
}

export async function signOut() {
  const response = await fetch(API_URLS.AUTH.SIGN_OUT, {
    method: 'POST',
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    console.log(await response.text());
    return;
  }

  cookies().delete('sessionId');
  cookies().delete('accessToken');

  revalidateTag('currentUser');
  redirect('/');
}

export async function signWithOAuth(url: string) {
  redirect(url);
}
