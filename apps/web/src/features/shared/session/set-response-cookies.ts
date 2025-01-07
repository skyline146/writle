import "server-only";

import type { SessionCookies } from "@posts-app/types";
import type { NextResponse } from "next/server";

export const setSessionCookiesToResponse = (
	response: NextResponse,
	session: SessionCookies,
) => {
	const { accessToken, sessionId } = session;

	response.cookies.set("accessToken", accessToken.value, {
		...accessToken.options,
		sameSite: "lax",
		expires: new Date(accessToken.options.expires),
	});

	response.cookies.set("sessionId", sessionId, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
	});

	return response;
};
