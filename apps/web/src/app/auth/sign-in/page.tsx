import { AuthFormWrapper } from '@/features/app/auth/ui/auth-form-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writle - Sign In',
  description: 'Sign in page.',
};

export default function SignIn({ searchParams }: PageProps) {
  const oAuthError = searchParams?.oAuthError as string | undefined;

  return <AuthFormWrapper mode='signIn' oAuthError={oAuthError} />;
}
