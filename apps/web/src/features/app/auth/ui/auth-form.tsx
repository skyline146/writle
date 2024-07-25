import { Form, SubmitFormButton } from "@/features/shared/ui/form";
import { Input } from "@/features/shared/ui/input";
import { NavLink } from "@/features/shared/ui/link";

const authMode = {
  signIn: {
    text: "Sign In",
    question: "Don't have an account?",
    link: {
      text: "Sign up",
      to: "sign-up",
    },
  },
  signUp: {
    text: "Sign Up",
    question: "Already have an account?",
    link: {
      text: "Sign in",
      to: "sign-in",
    },
  },
} as const;

export const AuthForm = ({ mode }: { mode: "signIn" | "signUp" }) => {
  const authForm = authMode[mode];

  return (
    <Form className="flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 p-8">
      <h1 className="text-center text-2xl">{authForm.text}</h1>
      <Input name="username" placeholder="Username" />
      <Input name="password" type="password" placeholder="Password" />
      <SubmitFormButton>{authForm.text}</SubmitFormButton>
      <div className="flex gap-2">
        <p>{authForm.question}</p>
        <NavLink href={`/auth/${authForm.link.to}`} withArrow>
          {authForm.link.text}
        </NavLink>
      </div>
    </Form>
  );
};
