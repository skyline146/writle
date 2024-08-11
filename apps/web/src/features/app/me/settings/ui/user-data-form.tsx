import { Form, SubmitFormButton } from '@/features/shared/ui/form';
import { Input } from '@/features/shared/ui/input';
import { ImageInput } from './image-input';
import { getCurrentUser } from '@/features/app/shared/get-current-user';
import { User } from '@posts-app/types';
import { twMerge } from 'tailwind-merge';

export const UserDataForm = async () => {
  const user = (await getCurrentUser()) as User;
  const registeredAt = new Date(user.registeredAt).toLocaleString();

  return (
    <div className='space-y-5'>
      <p className='text-neutral-400'>Registered at: {registeredAt}</p>
      <Form className='flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-16'>
        <ImageInput user={user} />
        <div className='flex w-[400px] flex-col justify-evenly gap-5'>
          <Input
            type='text'
            name='username'
            label='Username'
            defaultValue={user.username || undefined}
          />
          {/* TODO: implement normal disabled input with cva */}
          <Input
            type='text'
            name='email'
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
          />
          <Input
            type='text'
            name='firstName'
            label='First name'
            defaultValue={user.firstName}
          />
          <Input
            type='text'
            name='lastName'
            label='Last name'
            defaultValue={user.lastName || undefined}
          />
          <SubmitFormButton>Save</SubmitFormButton>
        </div>
      </Form>
    </div>
  );
};
