'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

//TODO: implement cva for input different states

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, label, error, ...props }, ref) => {
    const input: ReactNode = (
      <input
        className={twMerge(
          'h-10 w-full rounded-md border-2 border-neutral-800 bg-neutral-900 p-2 font-medium outline-none',
          className,
          error && 'border-red-500',
        )}
        ref={ref}
        name={name}
        id={label && name}
        {...props}
      />
    );

    if (!label) {
      return (
        <div className='flex flex-col'>
          {input}
          {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
      );
    }

    return (
      <label htmlFor={name} className='flex flex-col'>
        {label}: {input}
      </label>
    );
  },
);
