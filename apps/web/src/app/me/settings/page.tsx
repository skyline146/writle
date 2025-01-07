import {
	UserSettings,
	UserSettingsSkeleton,
} from "@/features/app/me/settings/ui/user-settings";
import { SectionTitle } from "@/features/app/me/ui/section-title";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Writle - Settings",
	description: "User related settings page.",
};

export default async function Settings() {
	return (
		<>
			<SectionTitle title="Settings" />
			<Suspense fallback={<UserSettingsSkeleton />}>
				<UserSettings />
			</Suspense>
		</>
	);
}
