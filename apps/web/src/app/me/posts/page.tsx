import { Suspense } from 'react';
import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Button } from '@/features/shared/ui/button';
import { NavLink } from '@/features/shared/ui/link';
import { PostsList, PostCardSkeleton } from '@/features/shared/ui/posts';
import { User } from '@posts-app/types';
import { Metadata } from 'next';
import { SearchInput } from '@/features/shared/ui';

interface MyPostsProps extends PageProps {
  searchParams: {
    searchText?: string;
  };
}

export const metadata: Metadata = {
  title: 'Writle - My Posts',
  description: 'User related posts page.',
};

export default function MyPosts({ searchParams }: MyPostsProps) {
  const { searchText } = searchParams;

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <SectionTitle title='My Posts' />
          <NavLink href='/me/posts/create'>
            <Button>Create post</Button>
          </NavLink>
        </div>
        <SearchInput />
      </div>
      <main className='flex flex-col gap-5'>
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
