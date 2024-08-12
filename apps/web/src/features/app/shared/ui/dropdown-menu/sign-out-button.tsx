'use client';

import { Button } from '@/features/shared/ui';
import { IconLogout } from '@tabler/icons-react';
import { signOut } from '@/features/app/auth/actions';

export const SignOutButton = () => {
  // TODO: implement cva for button different variants
  return (
    <Button
      className='flex w-full justify-center gap-2 border-2 border-neutral-600 bg-transparent text-neutral-400'
      onClick={async () => {
        await signOut();
      }}
    >
      Sign out <IconLogout />
    </Button>
  );
};
