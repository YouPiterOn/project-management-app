import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  id,
  register,
  error,
  className,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium mb-1'>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...register}
        className='w-full border rounded-md px-3 py-2 text-sm'
      />
      {error && <p className='text-destructive text-xs mt-1'>{error.message}</p>}
    </div>
  );
}
