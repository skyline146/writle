"use client";

import { FormHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../button";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = ({ className, children, ...props }: FormProps) => {
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
};

export const SubmitFormButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
};
