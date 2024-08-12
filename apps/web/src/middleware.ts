import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseJwt } from './features/shared/lib/parse-jwt';
import { JwtPayload } from '@posts-app/types';
import { setSessionCookiesToResponse } from './features/shared/lib/set-session-cookies';
import { refreshTokens } from './features/shared/lib/refresh-session';

async function refreshSession(request: NextRequest) {
  const session = await refreshTokens();

  if (!session) {
    //if request fails, redirect to '/', also delete session cookies
    const res = NextResponse.redirect(new URL('/', request.url));
    res.cookies.delete('sessionId');
    res.cookies.delete('accessToken');

    return res;
  }

  //after successfull refresh check if visited /auth/* page
  const isAuthPage = new URL(request.url).pathname.startsWith('/auth');
  if (isAuthPage) {
    //redirect to /me/posts
    const res = NextResponse.redirect(new URL('/me/posts', request.url));
    return setSessionCookiesToResponse(res, session);
  } else {
    //open requested page
    return setSessionCookiesToResponse(NextResponse.next(), session);
  }
}

export async function middleware(request: NextRequest) {
  //check if request is server action, skip middleware
  if (request.method === 'POST') {
    return;
  }

  const requestHeaders = new Headers(request.headers);
  const url = new URL(request.url);

  const accessToken = cookies().get('accessToken')?.value;
  const sessionId = cookies().get('sessionId')?.value;

  //check accessToken on exist or expired
  if (!accessToken) {
    //check if no session cookies are presented
    if (!sessionId) {
      //redirect to auth page, if user specific page visited
      if (url.pathname.startsWith('/me')) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
      }
      return;
    } else {
      return await refreshSession(request);
    }
  } else {
    const jwtPayload: JwtPayload = parseJwt(accessToken);

    //check if accessToken expires in less than 20 seconds
    if (jwtPayload.exp - Math.floor(Date.now() / 1000) < 20) {
      return await refreshSession(request);
    }
  }

  //session tokens validation passed, check if visited /auth/* page -> redirect to /me/posts
  if (url.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/me/posts', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
