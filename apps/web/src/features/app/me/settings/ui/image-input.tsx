'use client';

import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ProfilePicture } from '@/features/shared/ui/profile-picture';
import { User } from '@posts-app/types';

interface ImageInputProps {
  user: User;
}

export const ImageInput = ({ user }: ImageInputProps) => {
  const [file, setFile] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<null | string>(
    user.profilePicture,
  );
  const [error, setError] = useState<null | string>(null);

  // useEffect(() => {
  //   if (!previewUrl) {
  //     setFile(null);
  //   }
  // }, [previewUrl]);

  return (
    <div className='relative flex flex-col items-center gap-3'>
      <label
        htmlFor='uploadAvatar'
        className='size-48 rounded-full hover:cursor-crosshair'
      >
        <ProfilePicture
          user={{ ...user, profilePicture: previewUrl }}
          className='border-4 border-white text-8xl'
        />
        <input
          type='file'
          name='avatar'
          id='uploadAvatar'
          accept='.gif,.jpg,.jpeg,.png'
          onChange={(e) => {
            const newFile: File | null =
              e.target.files && e.target.files.item(0);

            setError(null);
            //check if newFile is selected and < 5 MB
            if (!newFile) return;

            if (newFile.size > 5242880) {
              setError('Image must be less than 5 MB');
            } else {
              // setFile(newFile);
              setPreviewUrl(URL.createObjectURL(newFile));
            }
          }}
          className='hidden'
        />
      </label>
      {error && (
        <p className='max-w-28 text-balance text-sm text-red-500'>{error}</p>
      )}
      {previewUrl && (
        <div
          className='absolute right-0 top-0 text-white hover:cursor-pointer'
          onClick={() => setPreviewUrl(null)}
        >
          <IconX />
        </div>
      )}
    </div>
  );
};
