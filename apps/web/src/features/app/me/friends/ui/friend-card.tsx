import { IconX } from '@tabler/icons-react';
import { ProfilePicture } from '@/features/shared/ui/profile-picture';
import { User } from '@posts-app/types';

interface FriendCardProps {
  friend: User;
}

export const FriendCard = ({ friend }: FriendCardProps) => {
  return (
    <div className='flex items-center justify-between rounded-lg bg-neutral-900 p-5'>
      <div className='flex gap-4'>
        <ProfilePicture user={friend} className='size-16' />
        <div>
          <p className='text-lg'>
            {friend.firstName} {friend.lastName}
          </p>
          <p className='text-neutral-400'>@{friend.username}</p>
        </div>
      </div>
      <IconX
        className='cursor-pointer text-neutral-700 hover:text-red-500'
        size={30}
      />
    </div>
  );
};

export const FriendCardSkeleton = () => {
  return (
    <div className='flex animate-pulse items-center gap-4 rounded-lg bg-neutral-900 p-5'>
      <div className='size-14 rounded-full bg-neutral-800'></div>
      <div className='flex flex-col gap-2'>
        <div className='h-[28px] w-52 rounded-md bg-neutral-800'></div>
        <div className='h-[24px] w-36 rounded-md bg-neutral-800'></div>
      </div>
    </div>
  );
};
