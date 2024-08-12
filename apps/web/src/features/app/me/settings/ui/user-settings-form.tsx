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

  const onAction: () => void = handleSubmit(async (data: UserSettings) => {
    await updateUserData(data);
  });

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
          {...register('username', {
            setValueAs: (value) => value || null,
          })}
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
          defaultValue={user.email || undefined}
          error={errors.email?.message}
          {...register('email', {
            setValueAs: (value) => value || null,
          })}
        />
        <Input
          label='First name'
          defaultValue={user.firstName}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label='Last name'
          defaultValue={user.lastName || undefined}
          error={errors.lastName?.message}
          {...register('lastName', {
            setValueAs: (value) => value || null,
          })}
        />
        <SubmitFormButton>Save</SubmitFormButton>
      </div>
    </Form>
  );
};
