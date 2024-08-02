import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className='rounded-md bg-neutral-100 px-3 py-2 font-semibold text-black hover:bg-slate-200 disabled:bg-neutral-400'
      {...props}
    >
      {children}
    </button>
  );
};
