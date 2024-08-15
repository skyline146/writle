'use client';

import { Form, SubmitFormButton } from '@/features/shared/ui/form';
import { Input } from '@/features/shared/ui/input';
import { ImageInput } from './image-input';
import { User, UserSettings } from '@posts-app/types';
import { twMerge } from 'tailwind-merge';
import { UserSettingsSchema } from '@posts-app/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateUserData } from '../actions';
import { useEffect } from 'react';
import { Button } from '@/features/shared/ui';

interface UserSettingsFormProps {
  user: User;
}

export type FormInputs = {
  username: string;
  firstName: string;
  lastName: string | null;
  email: string;
  profilePicture: File | undefined | null;
};

export const UserSettingsForm = ({ user }: UserSettingsFormProps) => {
  const { username, firstName, lastName, email } = user;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
  } = useForm<FormInputs>({
    mode: 'all',
    resolver: zodResolver(UserSettingsSchema),
  });

  useEffect(() => {
    if (!username) {
      setError(
        'username',
        { message: 'To complete account creation, you must enter username' },
        { shouldFocus: true },
      );
    }
  }, []);

  const onAction: () => void = handleSubmit(async (data: UserSettings) => {
    await updateUserData(data);
    setValue('profilePicture', undefined);
  });

  const isCredentials = user.provider === 'credentials';

  return (
    <Form
      action={onAction}
      className='flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-16'
    >
      <ImageInput user={user} control={control} setFile={setValue} />
      <div className='flex w-[400px] flex-col justify-evenly gap-5'>
        <Input
          label='Username'
          defaultValue={user.username || undefined}
          error={errors.username?.message}
          {...register('username')}
        />
        {/* TODO: implement normal disabled input with cva */}
        <Input
          label='Email'
          title={
            user.provider !== 'credentials'
              ? "You logged in without credentials, email can't be changed"
              : undefined
          }
          className={twMerge(
            user.provider !== 'credentials' &&
              'text-neutral-500 hover:cursor-not-allowed',
          )}
          readOnly={user.provider !== 'credentials'}
          defaultValue={email || undefined}
          error={errors.email?.message}
          {...register('email', {
            setValueAs: (value) => value || null,
          })}
        />
        <Input
          label='First name'
          defaultValue={firstName}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label='Last name'
          defaultValue={lastName || undefined}
          error={errors.lastName?.message}
          {...register('lastName', {
            setValueAs: (value) => value || null,
          })}
        />
        <SubmitFormButton>Save</SubmitFormButton>
        <Button type='button'>Change password</Button>
      </div>
    </Form>
  );
};
