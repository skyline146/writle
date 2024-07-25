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
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!file) {
      setError(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
  }, [file]);

  return (
    <div className='relative flex flex-col gap-3'>
      <label
        htmlFor='uploadAvatar'
        className='size-48 rounded-full hover:cursor-crosshair'
      >
        <ProfilePicture
          user={{ ...user, profilePicture: previewUrl }}
          className='border-4 text-8xl'
        />
        <input
          type='file'
          name='avatar'
          id='uploadAvatar'
          accept='.gif,.jpg,.jpeg,.png'
          onChange={(e) => {
            const newFile: File | null =
              e.target.files && e.target.files.item(0);

            //check if newFile is selected and < 10 MB
            if (!newFile) return;

            if (newFile.size > 10485760) {
              setError('Image must be less than 10 MB');
            } else {
              setFile(newFile);
            }
          }}
          className='hidden'
        />
      </label>
      {error && <p className='text-balance text-red-500'>{error}</p>}
      {previewUrl && (
        <div
          className='absolute right-0 top-0 text-white hover:cursor-pointer'
          onClick={() => setFile(null)}
        >
          <IconX />
        </div>
      )}
    </div>
  );
};
