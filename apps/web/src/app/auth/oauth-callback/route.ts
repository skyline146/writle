import { ME_ROUTES } from "@/features/shared/config";
import { setSessionCookiesToResponse } from "@/features/shared/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const error = searchParams.get("error");

	if (error) {
		redirect(`/auth/sign-up?oAuthError=${error}`);
	}

	const user = cookies().get("user")?.value;

	if (!user) {
		return new Response("Error while getting user info", {
			status: 400,
		});
	}

	cookies().delete("user");

	const { session, isNewAccount } = JSON.parse(user);

	const redirectUrl = isNewAccount ? ME_ROUTES.SETTINGS : ME_ROUTES.POSTS;

	const response = setSessionCookiesToResponse(
		NextResponse.redirect(new URL(redirectUrl, request.url)),
		session,
	);

	return response;
}
