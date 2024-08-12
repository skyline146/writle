import { getCurrentUser } from '@/features/app/shared/get-current-user';
import { User } from '@posts-app/types';
import { UserSettingsForm } from './user-settings-form';
import { cookies } from 'next/headers';

export const UserSettings = async () => {
  const user = (await getCurrentUser()) as User;
  const registeredAt = new Date(user.registeredAt).toLocaleString();

  return (
    <div className='space-y-5'>
      <p className='text-neutral-400'>Registered at: {registeredAt}</p>
      <UserSettingsForm user={user} />
    </div>
  );
};

export const UserSettingsSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-16'>
      <div className='size-48 rounded-full bg-neutral-900'></div>
      <div className='flex w-[400px] flex-col justify-evenly gap-5 *:h-14 *:rounded-md *:bg-neutral-900'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
