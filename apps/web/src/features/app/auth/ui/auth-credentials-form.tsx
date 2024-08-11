'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authMode, FormInputs } from '../form-config';
import { Form, SubmitFormButton, Input } from '@/features/shared/ui';

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

export const AuthWithCredentialsForm = ({ mode }: AuthFormProps) => {
  const { text, action, validationSchema } = authMode[mode];
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormInputs>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
  });

  //TODO: form data type based on mode
  const onAction: () => void = handleSubmit(async (data: any) => {
    const response = await action(window.navigator.userAgent, data);
    // setError('username', { message }, { shouldFocus: true });
    // setServerResponse(response);
  });

  return (
    <Form
      className='flex flex-col gap-5'
      action={onAction}
      // onSubmit={handleSubmit(async (data: any) => await action(data))}
    >
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
            {...register('lastName', {
              setValueAs: (value) => value || null,
            })}
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
    </Form>
  );
};
