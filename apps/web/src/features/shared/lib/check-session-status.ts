import { parseJwt } from "./parse-jwt";

interface SessionTokens {
	accessToken?: string;
	sessionId?: string;
}

type SessionStatus = "expired" | "none" | "active";
/**
 * ```ts
 * type SessionStatus = 'expired' | 'none' | 'active'
 * ```
 */
export const checkSessionStatus = ({
	accessToken,
	sessionId,
}: SessionTokens): SessionStatus => {
	if (!sessionId) return "none";
	if (!accessToken) return "expired";

	//check if accessToken expires in less than 20 seconds
	if (parseJwt(accessToken).exp - Math.floor(Date.now() / 1000) < 20)
		return "expired";

	return "active";
};
