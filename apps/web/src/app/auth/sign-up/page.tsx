import { AuthFormWrapper } from '@/features/app/auth/ui/auth-form-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writle - Sign Up',
  description: 'Sign up page.',
};

export default function SignUp({ searchParams }: PageProps) {
  const oAuthError = searchParams?.oAuthError as string | undefined;

  return <AuthFormWrapper mode='signUp' oAuthError={oAuthError} />;
}
