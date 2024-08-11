import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseJwt } from './features/shared/lib/parse-jwt';
import { SessionCookies } from '@posts-app/types';
import { API_URLS } from './features/shared/config';
import { setSessionCookiesToResponse } from './features/shared/lib/set-session-cookies';

type JwtPayload = {
  sub: string;
  userId: string;
  exp: number;
};

async function refreshSession(request: NextRequest) {
  const response = await fetch(API_URLS.AUTH.REFRESH_SESSION, {
    method: 'POST',
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.cookies.delete('sessionId');
    res.cookies.delete('accessToken');

    return res;
  }

  const session: SessionCookies = await response.json();
  const res = setSessionCookiesToResponse(NextResponse.next(), session);
  return res;
}

export async function middleware(request: NextRequest) {
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

  if (['/auth/sign-in', '/auth/sign-up'].includes(url.pathname)) {
    return NextResponse.redirect(new URL('/me/posts', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/me/:path*', '/auth/:path*'],
};
