
import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'
import type { InputProps } from '../../types/input'

export function Input({
  label,
  error,
  value,
  onChange,
  icon,
  showPasswordToggle = false,
  type = 'text',
  labelClassName,
  iconClassName,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [haveError, setHaveError] = useState(false)

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  useEffect(() => {
    if(error && error.length > 0) {
      setHaveError(true)
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(haveError) {
      setHaveError(false)
    }

    onChange?.(e.target.value)
  }

  return (
    <div className="group">
      <div className="w-full h-fit flex flex-col justify-center">
        {label && (
          <label
            htmlFor={props.id}
            className={twMerge(
              'text-sm transition-all duration-300 h-fit w-fit',
              haveError ? 'text-red-200' : 'text-gray-400',
             (isFocused || value
                ? `-translate-y-1 translate-x-3`
                : `translate-y-[2.45rem] ${icon ? 'translate-x-12' : 'translate-x-6'}`
              ),
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className={twMerge(
          "flex flex-row items-center border rounded-xl pl-4 py-4 space-x-4",
          haveError ? 'border-red-300 focus-within:border-red-300' : "border-gray-600 focus-within:border-gray-500"
          
        )}>
          {icon && (
            <span className={twMerge(haveError ? 'text-red-300' : 'text-gray-400', iconClassName)}>
              {icon}
            </span>
          )}

          <input
            {...props}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={twMerge(
              'flex flex-1 focus:outline-none bg-transparent text-white',
              className
            )}
          />

          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="h-full pr-4 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          )}
        </div>

        {haveError && error && (
          <span className="text-red-200 text-sm mt-1">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
