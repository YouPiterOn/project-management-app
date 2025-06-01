import { Check } from "lucide-react"

const sizeClasses = {
  sm: {
    checkbox: "h-4 w-4",
    icon: "h-3 w-3",
    text: "text-sm",
  },
  md: {
    checkbox: "h-5 w-5",
    icon: "h-4 w-4",
    text: "text-base",
  },
  lg: {
    checkbox: "h-6 w-6",
    icon: "h-5 w-5",
    text: "text-lg",
  },
}

interface CheckboxProps {
  label?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, size = "md", disabled = false, checked = false, onChange }: CheckboxProps) => {
  const sizes = sizeClasses[size]

  return (
    <div className='flex items-center gap-3'>
      <div className="relative flex items-center">
        <div
          className={`
              ${sizes.checkbox}
              border-2 rounded-md
              flex items-center justify-center
              transition-all duration-200
              cursor-pointer
              ${checked
              ? "bg-primary border-primary text-primary-foreground"
              : "bg-background border-border hover:border-primary/50"
            }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
            `}
          onClick={() => {
            onChange(!checked)
          }}
        >
          {checked && <Check className={`${sizes.icon} stroke-[3]`} />}
        </div>
      </div>

      {label && (
        <div className="flex-1 min-w-0">
          {label && (
            <p
              className={`
                  ${sizes.text} font-medium text-foreground
                  cursor-pointer select-none
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              onClick={() => {
                onChange(!checked)
              }}
            >
              {label}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
