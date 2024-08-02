import { Button } from '@/features/shared/ui/button';
import { NavLink } from '@/features/shared/ui/link';
import { ProfilePicture } from '@/features/shared/ui/profile-picture';
import {
  IconCaretDownFilled,
  IconNotes,
  IconUsers,
  IconTool,
  IconLogout,
} from '@tabler/icons-react';
import Link from 'next/link';
// import { User } from '@posts-app/types';
import { User } from '@posts-app/types';

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

async function getUser2(): Promise<null> {
  return await new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, 2000);
  });
}

export const UserDropdownMenu = async () => {
  const user: User | null = await getUser();
  return (
    <>
      {user ? (
        <div className='group/dropdown sm:relative'>
          <div className='flex items-center gap-2'>
            <ProfilePicture user={user} className='size-12 border-2 p-[2px]' />
            <p className='m-0'>
              {user.firstName} {user.lastName}
            </p>
            <IconCaretDownFilled className='transition-transform duration-300 group-hover/dropdown:rotate-180' />
          </div>
          <nav className='invisible absolute left-0 right-0 m-auto w-3/4 translate-y-3 scale-90 pt-5 opacity-0 transition-all duration-300 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:scale-100 group-hover/dropdown:opacity-100 sm:w-full'>
            <ul className='rounded-md bg-neutral-900 *:p-3'>
              <li>
                <NavLink href='/me/posts' icon={<IconNotes />}>
                  My posts
                </NavLink>
              </li>
              <li>
                <NavLink href='/me/friends' icon={<IconUsers />}>
                  Friends
                </NavLink>
              </li>
              <li>
                <NavLink href='/me/settings' icon={<IconTool />}>
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink href='/' icon={<IconLogout />}>
                  Sign out
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <Link href='/auth/sign-in'>
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export const UserDropdownMenuSkeleton = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='size-11 animate-pulse rounded-full bg-neutral-800' />
      <div className='h-11 w-48 animate-pulse rounded-md bg-neutral-800' />
    </div>
  );
};
