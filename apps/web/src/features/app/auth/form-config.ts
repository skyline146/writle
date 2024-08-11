import {
  SignInWithCredentialsSchema,
  SignUpWithConfirmPasswordSchema,
} from '@posts-app/zod';
import { signIn, signUp } from './actions';

export const authMode = {
  signIn: {
    text: 'Sign In',
    question: "Don't have an account?",
    link: {
      text: 'Sign up',
      to: 'sign-up',
    },
    action: signIn,
    validationSchema: SignInWithCredentialsSchema,
  },
  signUp: {
    text: 'Sign Up',
    question: 'Already have an account?',
    link: {
      text: 'Sign in',
      to: 'sign-in',
    },
    action: signUp,
    validationSchema: SignUpWithConfirmPasswordSchema,
  },
} as const;

export type FormInputs = {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  confirmPassword?: string;
};
