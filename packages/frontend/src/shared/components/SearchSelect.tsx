import { Search, X, ChevronDown } from "lucide-react"
import { forwardRef, useState, useEffect, useRef } from "react"

interface Option {
  label: string
  value: string
}

interface SearchSelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange " | "onSelect"> {
  label?: string
  options: Option[]
  value?: string
  onValueChange?: (value: string) => void
  onSelect?: (option: Option) => void
  onClear?: () => void
  showClearButton?: boolean
  filterLocally?: boolean
}

export const SearchSelect = forwardRef<HTMLInputElement, SearchSelectProps>(
  (
    {
      label,
      options,
      value,
      onValueChange,
      onSelect,
      onClear,
      showClearButton = true,
      filterLocally = true,
      placeholder = "Search or select...",
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value)
        if (option) {
          setSelectedOption(option)
          setInputValue(option.label)
        }
      } else {
        setSelectedOption(null)
        setInputValue("")
      }
    }, [value, options])

    useEffect(() => {
      if (filterLocally) {
        setFilteredOptions(options.filter((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase())))
      } else {
        setFilteredOptions(options)
      }
    }, [inputValue, options, filterLocally])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onValueChange?.(newValue)

      if (selectedOption && newValue !== selectedOption.label) {
        setSelectedOption(null)
      }

      setIsOpen(true)
    }

    const handleSelect = (option: Option) => {
      setSelectedOption(option)
      setInputValue(option.label)
      setIsOpen(false)
      onSelect?.(option)
      onValueChange?.(option.value)
    }

    const handleClear = () => {
      setInputValue("")
      setSelectedOption(null)
      setIsOpen(false)
      onClear?.()
      onValueChange?.("")
    }

    const handleFocus = () => {
      setIsOpen(true)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <div className="w-full" ref={containerRef}>
        {label && <label className="block text-sm font-medium mb-2">{label}</label>}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="
              w-full pl-10 pr-16 py-3
              border rounded-xl shadow-sm
              bg-background
              text-foreground
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            {...props}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {showClearButton && (inputValue || selectedOption) && (
              <button type="button" onClick={handleClear} className="p-1 hover:bg-muted rounded-md transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-xl shadow-lg max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-4 py-3 cursor-pointer transition-colors
                      hover:bg-muted
                      ${selectedOption?.value === option.value ? "bg-muted" : ""}
                    `}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-muted-foreground text-sm">No options found</div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)

SearchSelect.displayName = "SearchSelect"
