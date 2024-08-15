import { NavLink } from '@/features/shared/ui';
import { authMode } from '../config';
import { AuthWithCredentialsForm } from './auth-credentials-form';
import { OAuthProvidersButtons } from './oauth-providers-buttons';

interface AuthFormWrapperProps {
  mode: 'signIn' | 'signUp';
  oAuthError?: string;
}

export const AuthFormWrapper = ({ mode, oAuthError }: AuthFormWrapperProps) => {
  const { text, question, link } = authMode[mode];
  return (
    <div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 p-8'>
      <h1 className='text-center text-2xl'>{text}</h1>
      <AuthWithCredentialsForm mode={mode} />
      {/* Handling error from Api on OAuth2 authentication */}
      {oAuthError && <p className='text-red-500'>{oAuthError}</p>}
      <div className='flex flex-wrap justify-between gap-3'>
        <OAuthProvidersButtons />
      </div>
      <div className='flex gap-2'>
        <p>{question}</p>
        <NavLink href={`/auth/${link.to}`} withArrow>
          {link.text}
        </NavLink>
      </div>
    </div>
  );
};
