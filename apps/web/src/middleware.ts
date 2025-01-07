import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
	AUTH_BASE,
	AUTH_ROUTES,
	HOME,
	ME_BASE,
	ME_ROUTES,
} from "./features/shared/config";
import { checkSessionStatus } from "./features/shared/lib/check-session-status";
import {
	refreshSession,
	setSessionCookiesToResponse,
} from "./features/shared/session";

export async function middleware(request: NextRequest) {
	//if request is a server action, skip middleware
	if (request.method === "POST") return;

	const requestHeaders = new Headers(request.headers);
	const pathname = new URL(request.url).pathname;

	const accessToken = cookies().get("accessToken")?.value;
	const sessionId = cookies().get("sessionId")?.value;

	const sessionStatus = checkSessionStatus({ accessToken, sessionId });

	switch (sessionStatus) {
		case "none": {
			if (pathname.startsWith(ME_BASE))
				return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN, request.url));

			return;
		}
		case "expired": {
			return await responseWithNewSession(request);
		}
		case "active": {
			if (pathname.startsWith(AUTH_BASE))
				return NextResponse.redirect(new URL(ME_ROUTES.POSTS, request.url));
		}
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

async function responseWithNewSession(request: NextRequest) {
	const session = await refreshSession();
	const pathname = new URL(request.url).pathname;

	if (!session) {
		// res.cookies.delete('sessionId');
		// res.cookies.delete('accessToken');

		if (!pathname.startsWith(ME_BASE)) return NextResponse.next();

		return NextResponse.redirect(new URL(HOME, request.url));
	}

	if (!pathname.startsWith(AUTH_BASE))
		return setSessionCookiesToResponse(NextResponse.next(), session);

	const res = NextResponse.redirect(new URL(ME_ROUTES.POSTS, request.url));
	return setSessionCookiesToResponse(res, session);
}
