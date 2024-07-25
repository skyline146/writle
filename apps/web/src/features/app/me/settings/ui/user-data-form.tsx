import { Form, SubmitFormButton } from '@/features/shared/ui/form';
import { Input } from '@/features/shared/ui/input';
import { User } from '@posts-app/types';
import { ImageInput } from './image-input';

async function getUser(): Promise<User> {
  return await new Promise((res) => {
    setTimeout(() => {
      res({
        firstName: 'Arthur',
        lastName: 'Pridrillov',
        username: 'archibald163',
        profilePicture: '/test_profile_picture.jpg',
      });
    }, 2000);
  });
}

export const UserDataForm = async () => {
  const user: User = await getUser();
  return (
    <Form className='flex flex-col items-center gap-4 sm:flex-row sm:gap-16'>
      <ImageInput user={user} />
      <div className='flex w-[400px] flex-col justify-evenly gap-5'>
        <Input
          type='text'
          name='username'
          label='Username'
          defaultValue={user.username}
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
          defaultValue={user.lastName}
        />
        <SubmitFormButton>Save</SubmitFormButton>
      </div>
    </Form>
  );
};
