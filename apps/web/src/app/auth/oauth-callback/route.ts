import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setSessionCookiesToResponse } from '@/features/shared/lib/set-session-cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const error = searchParams.get('error');

  if (error) {
    redirect(`/auth/sign-up?oAuthError=${error}`);
  }

  const session = cookies().get('session')?.value;

  if (!session) {
    return new Response('No session provided', {
      status: 400,
    });
  }

  cookies().delete('session');

  const response = setSessionCookiesToResponse(
    NextResponse.redirect(new URL('/', request.url)),
    JSON.parse(session),
  );

  return response;
}
