import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, placeholder = 'Select an option', children, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && <label className='block text-sm font-medium mb-2'>{label}</label>}
        <div className='relative'>
          <select
            ref={ref}
            className='
              w-full px-4 py-3 
              border rounded-xl shadow-sm 
              bg-background 
              text-foreground
              focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              appearance-none cursor-pointer
            '
            {...props}
          >
            <option value='' disabled>
              {placeholder}
            </option>
            {children}
          </select>
          <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none' />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
