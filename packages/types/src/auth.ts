import type {
	SignInWithCredentialsSchema,
	SignUpWithConfirmPasswordSchema,
	SignUpWithCredentialsSchema,
} from "@posts-app/zod";
import type z from "zod";

export type SignUpWithConfirmPassword = z.infer<
	typeof SignUpWithConfirmPasswordSchema
>;
export type SignUpWithCredentials = z.infer<typeof SignUpWithCredentialsSchema>;
export type SignInWithCredentials = z.infer<typeof SignInWithCredentialsSchema>;
