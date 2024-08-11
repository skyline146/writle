import { AuthFormWrapper } from '@/features/app/auth/ui/auth-form-wrapper';

export default function SignIn({ searchParams }: PageProps) {
  const oAuthError = searchParams?.oAuthError as string;

  return <AuthFormWrapper mode='signIn' oAuthError={oAuthError} />;
}
