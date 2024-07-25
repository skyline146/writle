import { Suspense } from 'react';
import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Button } from '@/features/shared/ui/button';
import { NavLink } from '@/features/shared/ui/link';
import { PostsList, PostCardSkeleton } from '@/features/shared/ui/posts';

export default function MyPosts() {
  return (
    <>
      <div className='flex items-center gap-10'>
        <SectionTitle title='My Posts' />
        <NavLink href='/me/posts/create'>
          <Button>Create post</Button>
        </NavLink>
      </div>
      <main className='flex flex-col gap-4'>
        <Suspense
          fallback={
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          }
        >
          <PostsList />
        </Suspense>
      </main>
    </>
  );
}
