import type { InputHTMLAttributes } from 'react'

export interface InputFieldState {
  value?: string
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  labelClassName?: string,
  iconClassName?: string,
  icon?: React.ReactNode
  showPasswordToggle?: boolean
}

export interface FormFields {
  [key: string]: InputFieldState
}