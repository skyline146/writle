import { SectionTitle } from "@/features/app/me/ui/section-title";
import { SearchInput } from "@/features/shared/ui";
import { Button } from "@/features/shared/ui/button";
import { NavLink } from "@/features/shared/ui/link";
import { PostCardSkeleton, PostsList } from "@/features/shared/ui/posts";
import type { User } from "@posts-app/types";
import type { Metadata } from "next";
import { Suspense } from "react";

interface MyPostsProps extends PageProps {
	searchParams: {
		searchText?: string;
	};
}

export const metadata: Metadata = {
	title: "Writle - My Posts",
	description: "User related posts page.",
};

export default function MyPosts({ searchParams }: MyPostsProps) {
	const { searchText } = searchParams;

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-10">
					<SectionTitle title="My Posts" />
					<NavLink href="/me/posts/create">
						<Button>Create post</Button>
					</NavLink>
				</div>
				<SearchInput />
			</div>
			<main className="flex flex-col gap-5">
				<Suspense
					key={searchText}
					fallback={
						<>
							<PostCardSkeleton />
							<PostCardSkeleton />
						</>
					}
				>
					<PostsList author={{} as User} />
				</Suspense>
			</main>
		</>
	);
}
