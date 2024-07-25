import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { User } from '@posts-app/types';

interface ProfilePictureProps {
  user: User;
  className?: string;
}

export const ProfilePicture = ({ user, className }: ProfilePictureProps) => {
  const { firstName, profilePicture } = user;
  return (
    <div
      className={twMerge(
        'pointer-events-none size-full rounded-full border-[3px] border-neutral-600 p-[2px] text-xl',
        className,
      )}
    >
      <div className='relative flex size-full items-center justify-center overflow-hidden rounded-full bg-white text-black'>
        {profilePicture ? (
          <Image
            src={profilePicture}
            className='object-cover'
            style={{ overflowClipMargin: 'unset' }}
            alt='Profile picture'
            fill
            sizes='100%'
            // placeholder="blur"
            // blurDataURL={dataUrl}
            // width={1200}
            // height={1200}
          />
        ) : (
          firstName.at(0)
        )}
      </div>
    </div>
  );
};
