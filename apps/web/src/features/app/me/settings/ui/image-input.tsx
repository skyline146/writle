"use client";

import { DeleteButton } from "@/features/shared/ui";
import { ProfilePicture } from "@/features/shared/ui/profile-picture";
import type { User } from "@posts-app/types";
import { useState } from "react";
import {
	type Control,
	Controller,
	type UseFormSetValue,
} from "react-hook-form";
import type { FormInputs } from "./user-settings-form";

interface ImageInputProps {
	user: User;
	control: Control<FormInputs, any>;
	setFile: UseFormSetValue<FormInputs>;
}

export const ImageInput = ({ user, control, setFile }: ImageInputProps) => {
	const [previewUrl, setPreviewUrl] = useState<null | string>(
		user.profilePicture,
	);
	const [error, setError] = useState<null | string>(null);

	return (
		<div className="relative flex flex-col items-center gap-3">
			<label
				htmlFor="uploadAvatar"
				className="size-48 rounded-full hover:cursor-crosshair"
			>
				<ProfilePicture
					user={{ ...user, profilePicture: previewUrl }}
					className="border-4 border-neutral-700 text-8xl"
				/>
				<Controller
					name="profilePicture"
					control={control}
					render={({ field: { value, onChange, ...field } }) => {
						return (
							<input
								type="file"
								id="uploadAvatar"
								accept=".gif,.jpg,.jpeg,.png"
								onChange={(e) => {
									const newFile: File | null = e.target.files?.item(0) ?? null;

									setError(null);

									if (!newFile) return;

									if (newFile.size > 5242880) {
										setError("Media file must be less than 5 MB");
										return;
									}

									onChange(newFile);
									setPreviewUrl(URL.createObjectURL(newFile));
								}}
								className="hidden"
								{...field}
							/>
						);
					}}
				/>
			</label>
			{error && (
				<p className="max-w-32 text-balance text-sm text-red-500">{error}</p>
			)}
			{previewUrl && (
				<button
					type="button"
					onClick={() => {
						setError(null);
						setPreviewUrl(null);
						setFile("profilePicture", null);
					}}
					className="absolute right-0 top-0"
				>
					<DeleteButton />
				</button>
			)}
		</div>
	);
};
