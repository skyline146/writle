'use client';

import { Button } from '@/features/shared/ui';
import { signWithOAuth } from '../actions';
import { API_URLS } from '@/features/shared/config';
import { twMerge } from 'tailwind-merge';

export const authProvidersButtons = [
  {
    provider: 'Google',
    styles: 'bg-red-600 hover:bg-red-700',
    url: '/google',
  },
  {
    provider: 'Discord',
    styles: 'bg-[#5865F2] hover:bg-[#4853ca]',
    url: '/discord',
  },
];

export const OAuthProvidersButtons = () => {
  return authProvidersButtons.map((button) => (
    <Button
      key={button.provider}
      className={twMerge(button.styles, 'w-[45%] flex-auto text-white')}
      onClick={async () => {
        await signWithOAuth(API_URLS.AUTH.OAUTH + button.url);
      }}
    >
      {button.provider}
    </Button>
  ));
};
