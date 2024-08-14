import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { User } from '@posts-app/types';

interface ProfilePictureProps {
  user: User;
  className?: string;
}

export const ProfilePicture = ({ user, className }: ProfilePictureProps) => {
  const { firstName, profilePicture, profilePictureBlurhash } = user;

  return (
    <div
      className={twMerge(
        'pointer-events-none size-full rounded-full text-xl',
        className,
      )}
    >
      <div
        className={twMerge(
          'relative flex size-full items-center justify-center overflow-hidden rounded-full text-black',
          !profilePicture && 'bg-white',
        )}
      >
        {profilePicture ? (
          <Image
            src={profilePicture}
            className='object-cover'
            style={{ overflowClipMargin: 'unset' }}
            alt="User's profile picture"
            fill
            sizes='100%'
            placeholder={profilePictureBlurhash ? 'blur' : 'empty'}
            blurDataURL={profilePictureBlurhash || undefined}
          />
        ) : (
          firstName.at(0)
        )}
      </div>
    </div>
  );
};
