import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Suspense } from 'react';
import {
  FriendsList,
  FriendCardSkeleton,
  SearchInput,
} from '@/features/app/me/friends/ui';

interface FriendsProps extends PageProps {
  searchParams: {
    searchText?: string;
  };
}

export default async function Friends({ searchParams }: FriendsProps) {
  const { searchText } = searchParams;

  return (
    <div className='md:w-[650px]'>
      <div className='mb-4 flex flex-col items-start justify-between xs:mb-0 xs:flex-row xs:items-center'>
        <SectionTitle title={'Friends'} />
        <SearchInput />
      </div>

      <div className='flex flex-col gap-4'>
        <Suspense
          key={searchText}
          fallback={
            <>
              <FriendCardSkeleton />
              <FriendCardSkeleton />
              <FriendCardSkeleton />
            </>
          }
        >
          <FriendsList search={searchText} />
        </Suspense>
      </div>
    </div>
  );
}
