import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let accessToken: string | null = null;

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // console.log('middleware');

  // console.log(request.ip || '127.0.0.1');

  // if (data.accessToken) {
  //   console.log('token exists', data.accessToken);
  // } else {
  //   console.log('no token');
  //   data.accessToken = 'jwt-token';
  // }

  // requestHeaders.set('accessToken', data.accessToken);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/me/:path*', '/auth/:path*'],
};
