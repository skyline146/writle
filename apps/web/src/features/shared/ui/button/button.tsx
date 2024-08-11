import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

//TODO: implement cva for auth providers and other shit

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-md bg-neutral-100 px-3 py-2 font-semibold text-black hover:bg-slate-200 disabled:bg-neutral-400',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
