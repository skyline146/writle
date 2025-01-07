import type { User } from "@posts-app/types";
import type { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ProfilePictureProps {
	user: User;
	className?: string;
}

export const ProfilePicture = ({ user, className }: ProfilePictureProps) => {
	const { firstName, profilePicture, profilePictureBlurhash } = user;

	let avatarContent: ReactNode = firstName.at(0);

	if (profilePicture)
		avatarContent = (
			<Image
				src={profilePicture}
				className="object-cover"
				style={{ overflowClipMargin: "unset" }}
				alt="User's profile picture"
				fill
				sizes="100%"
				placeholder={(profilePictureBlurhash as PlaceholderValue) || "empty"}
				// blurDataURL={profilePictureBlurhash || undefined}
			/>
		);

	return (
		<div
			className={twMerge(
				"pointer-events-none size-full rounded-full text-xl",
				className,
			)}
		>
			<div
				className={twMerge(
					"relative flex size-full items-center justify-center overflow-hidden rounded-full text-black",
					!profilePicture && "bg-white",
				)}
			>
				{avatarContent}
			</div>
		</div>
	);
};
