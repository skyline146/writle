'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignIn, SignUpWithConfirmPassword } from '@posts-app/zod';

const authApi = process.env.API_URL + '/auth';

type ErrorState = {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export async function signUp(
  userAgent: string,
  formData: SignUpWithConfirmPassword,
) {
  const { confirmPassword, ...userData } = formData;

  const response = await fetch(authApi + '/sign-up', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.log(await response.json());

    return;
    // return {
    //   ...prevState,
    //   username: await response.text(),
    // };
  }

  const { accessToken, sessionId } = await response.json();

  cookies().set('accessToken', accessToken.value, {
    ...accessToken.options,
    expires: new Date(accessToken.expires),
  });

  cookies().set('sessionId', sessionId);

  // redirect('/me/posts');
}

export async function signIn(userAgent: string, formData: SignIn) {
  const response = await fetch(authApi + '/sign-in', {
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

export async function signOut() {}

export async function refreshSession() {}
