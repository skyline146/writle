import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  setSessionCookiesToResponse,
  refreshSession,
} from './features/shared/session';
import { checkSessionStatus } from './features/shared/lib/check-session-status';
import {
  AUTH_BASE,
  AUTH_ROUTES,
  ME_BASE,
  ME_ROUTES,
} from './features/shared/config';

export async function middleware(request: NextRequest) {
  //check if request is a server action, skip middleware
  if (request.method === 'POST') {
    return;
  }

  const requestHeaders = new Headers(request.headers);
  const url = new URL(request.url);

  const accessToken = cookies().get('accessToken')?.value;
  const sessionId = cookies().get('sessionId')?.value;

  const sessionStatus = checkSessionStatus({ accessToken, sessionId });

  switch (sessionStatus) {
    case 'none': {
      //redirect to auth page, if protected page visited
      if (url.pathname.startsWith(ME_BASE)) {
        return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN, request.url));
      }

      return;
    }
    case 'expired': {
      return await responseWithNewSession(request);
    }
    case 'active': {
      //redirect to /me/posts, if auth page visited while session is active
      if (url.pathname.startsWith(AUTH_BASE)) {
        return NextResponse.redirect(new URL(ME_ROUTES.POSTS, request.url));
      }
    }
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

async function responseWithNewSession(request: NextRequest) {
  const session = await refreshSession();

  if (!session) {
    const isProtectedPage = new URL(request.url).pathname.startsWith(ME_BASE);
    //if request fails, redirect to '/' when protected page visited, also delete session cookies
    const res = isProtectedPage
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();

    res.cookies.delete('sessionId');
    res.cookies.delete('accessToken');

    return res;
  }

  //after successfull refresh check if visited /auth/* page
  const isAuthPage = new URL(request.url).pathname.startsWith(AUTH_BASE);
  if (isAuthPage) {
    //redirect to /me/posts
    const res = NextResponse.redirect(new URL(ME_ROUTES.POSTS, request.url));
    return setSessionCookiesToResponse(res, session);
  } else {
    //open requested page
    return setSessionCookiesToResponse(NextResponse.next(), session);
  }
}
