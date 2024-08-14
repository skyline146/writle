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
            placeholder='blur'
            blurDataURL='data:image/png;base64,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'
          />
        ) : (
          firstName.at(0)
        )}
      </div>
    </div>
  );
};
