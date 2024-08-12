import { IconApps, IconSignature } from '@tabler/icons-react';
import Link from 'next/link';
import { NavLink } from '@/features/shared/ui/link';
import { Suspense } from 'react';

import {
  UserDropdownMenu,
  UserDropdownMenuSkeleton,
} from './dropdown-menu/user-dropdown-menu';

export const Header = async () => {
  return (
    <header className='fixed left-0 right-0 top-0 z-[100] flex h-[120px] flex-col items-center justify-between gap-4 bg-header py-3 backdrop-blur-sm sm:h-[70px] sm:flex-row sm:px-10'>
      <nav className='flex items-center gap-5'>
        <Link href='/'>
          <div className='relative flex items-center gap-1 before:absolute before:-left-3 before:top-1 before:h-[40px] before:w-[40px] before:rounded-full before:bg-gradient-radial before:from-purple-600 before:to-blue-500 before:opacity-80 before:blur-md after:absolute after:-top-2 after:left-2 after:h-[40px] after:w-[40px] after:rounded-full after:bg-gradient-radial after:from-orange-500 after:to-yellow-300 after:opacity-80 after:blur-md'>
            <IconSignature className='z-10' size={32} />
            <h1 className='z-10 text-2xl font-bold'>WRITLE</h1>
            <span className='absolute right-0 bg-gradient-to-br from-yellow-200 to-orange-400 bg-clip-text text-2xl font-bold text-transparent blur-sm'>
              WRITLE
            </span>
          </div>
        </Link>
        <NavLink href='/about'>About</NavLink>
      </nav>
      <Suspense fallback={<UserDropdownMenuSkeleton />}>
        <UserDropdownMenu />
      </Suspense>
    </header>
  );
};
