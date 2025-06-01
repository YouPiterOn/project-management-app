import React from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export function FormField({
  label,
  id,
  type = 'text',
  register,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium mb-1'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className='w-full border rounded-md px-3 py-2 text-sm'
      />
      {error && <p className='text-destructive text-xs mt-1'>{error.message}</p>}
    </div>
  );
}
