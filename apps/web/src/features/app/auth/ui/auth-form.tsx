'use client';

import { Form, SubmitFormButton } from '@/features/shared/ui/form';
import { Input } from '@/features/shared/ui/input';
import { NavLink } from '@/features/shared/ui/link';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authMode, FormInputs } from '../form-config';
import { SignIn, SignUpWithConfirmPassword } from '@posts-app/zod';

export const AuthForm = ({ mode }: { mode: 'signIn' | 'signUp' }) => {
  const { text, question, link, action, schema } = authMode[mode];
  // const [_, formAction] = useFormState(action, {});
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  //todo. form data type based on mode
  const onAction: () => void = handleSubmit(async (data: any) => {
    const response = action(window.navigator.userAgent, data);
    // setServerResponse(response);
  });

  return (
    <Form
      className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 p-8'
      action={onAction}
      // onSubmit={handleSubmit(async (data: any) => await action(data))}
    >
      <h1 className='text-center text-2xl'>{text}</h1>
      {mode === 'signUp' && (
        <>
          <Input
            placeholder='First name'
            error={errors.firstName?.message}
            {...register('firstName', { required: true })}
          />
          <Input
            placeholder='Last name'
            error={errors.lastName?.message}
            {...register('lastName', { required: true })}
          />
        </>
      )}
      <Input
        placeholder='Username'
        error={errors.username?.message}
        {...register('username', { required: true })}
      />
      <Input
        type='password'
        placeholder='Password'
        error={errors.password?.message}
        {...register('password', { required: true })}
      />
      {mode === 'signUp' && (
        <Input
          type='password'
          placeholder='Confirm password'
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { required: true })}
        />
      )}
      <SubmitFormButton>{text}</SubmitFormButton>
      <div className='flex gap-2'>
        <p>{question}</p>
        <NavLink href={`/auth/${link.to}`} withArrow>
          {link.text}
        </NavLink>
      </div>
    </Form>
  );
};
