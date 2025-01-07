import type { JwtPayload } from "@posts-app/types";

export const parseJwt = (token: string): JwtPayload => {
	return JSON.parse(atob(token.split(".")[1]));
};
