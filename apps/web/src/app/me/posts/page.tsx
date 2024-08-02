import { Suspense } from 'react';
import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Button } from '@/features/shared/ui/button';
import { NavLink } from '@/features/shared/ui/link';
import { PostsList, PostCardSkeleton } from '@/features/shared/ui/posts';
import { User } from '@posts-app/types';
import { SearchInput } from '@/features/app/me/friends/ui/search-input';

export default function MyPosts() {
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
