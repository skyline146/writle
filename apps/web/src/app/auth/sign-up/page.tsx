import { AuthFormWrapper } from '@/features/app/auth/ui/auth-form-wrapper';

export default function SignUp({ searchParams }: PageProps) {
  const oAuthError = searchParams?.oAuthError as string;

  return <AuthFormWrapper mode='signUp' oAuthError={oAuthError} />;
}
