import { ReactNode } from 'react';
import { NavLink } from '../link';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { User } from '@posts-app/types';
import { ProfilePicture } from '../profile-picture';

export interface PostCardProps {
  title: string;
  firstParagraph: any;
  postId: string;
  author?: User;
}

export const PostCard = ({
  title,
  firstParagraph,
  postId,
  author,
}: PostCardProps) => {
  return (
    <div className='rounded-lg bg-neutral-900 p-5'>
      <div className='flex flex-col-reverse justify-between gap-4 md:flex-row'>
        <Link href={`/posts/${postId}`} className='h-full'>
          <h1
            className={twMerge(
              'text-xl font-medium transition-colors hover:cursor-pointer hover:text-orange-300',
            )}
          >
            {title}
          </h1>
        </Link>
        {author && (
          <div className='flex gap-3'>
            <div className='hidden w-[3px] shrink-0 rounded-md bg-neutral-500 md:block'></div>
            <NavLink href={`/users/${author.username}`}>
              <div className='group/author flex items-center gap-2'>
                <ProfilePicture className='size-14' user={author} />
                <p className='text-nowrap'>
                  {author.firstName} {author.lastName}
                </p>
              </div>
            </NavLink>
          </div>
        )}
      </div>
      <p className='mb-2 mt-4 text-balance text-neutral-300'>
        {firstParagraph}
      </p>
      <NavLink href={`/posts/${postId}`} withArrow>
        Read more
      </NavLink>
    </div>
  );
};

export const PostCardSkeleton = () => {
  return (
    <div className='h-[200px] animate-pulse rounded-lg bg-neutral-900 p-5'>
      <div className='h-[50px] w-2/3 rounded-md bg-neutral-800'></div>
      <div className='mt-4 h-[100px] w-full rounded-md bg-neutral-800'></div>
    </div>
  );
};
