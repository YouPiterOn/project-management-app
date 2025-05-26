import React from 'react';
import { Link, type LinkProps } from 'react-router';

const VARIANTS = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

const SIZES = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', ...props }, ref) => {
    const variantClasses = VARIANTS[variant] || VARIANTS.default;
    const sizeClasses = SIZES[size] || SIZES.default;

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 cursor-pointer
          ${variantClasses} ${sizeClasses}
        `}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export interface LinkButtonProps extends LinkProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

export const LinkButton = ({
  variant = 'default',
  size = 'default',
  ...props
}: LinkButtonProps) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.default;
  const sizeClasses = SIZES[size] || SIZES.default;

  return (
    <Link
      className={`
          inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 cursor-pointer
          ${variantClasses} ${sizeClasses}
        `}
      {...props}
    />
  );
};
