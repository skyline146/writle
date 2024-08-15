import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setSessionCookiesToResponse } from '@/features/shared/session';
import { NextRequest, NextResponse } from 'next/server';
import { ME_ROUTES } from '@/features/shared/config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const error = searchParams.get('error');

  if (error) {
    redirect(`/auth/sign-up?oAuthError=${error}`);
  }

  const user = cookies().get('user')?.value;

  if (!user) {
    return new Response('Error while getting user info', {
      status: 400,
    });
  }

  cookies().delete('user');

  const { session, isNewAccount } = JSON.parse(user);

  const redirectUrl = isNewAccount ? ME_ROUTES.SETTINGS : ME_ROUTES.POSTS;

  const response = setSessionCookiesToResponse(
    NextResponse.redirect(new URL(redirectUrl, request.url)),
    session,
  );

  return response;
}
