import { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ className, name, label, ...props }: InputProps) => {
  const input: ReactNode = (
    <input
      className={twMerge(
        'h-10 rounded-md border-2 border-neutral-800 bg-neutral-900 p-2 font-medium outline-none',
        className,
      )}
      name={name}
      id={label && name}
      {...props}
    />
  );

  if (!label) {
    return input;
  }

  return (
    <label htmlFor={name} className='flex flex-col'>
      {label}: {input}
    </label>
  );
};
