import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { httpException } from "../lib/httpException";

export const checkSession = createMiddleware(async (c, next) => {
	const sessionId = getCookie(c, "sessionId");

	if (!sessionId) {
		throw httpException(c, 401, "Session id must be provided");
	}

	c.set("sessionId", sessionId);

	await next();
});
