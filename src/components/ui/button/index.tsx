import { ReactNode, forwardRef, RefObject, MouseEvent } from 'react'
import { cva } from 'cva'
import { Loader } from '../loader'

import styles from './styles.module.css'

const enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  accept = 'accept',
  danger = 'danger'
}

interface ButtonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  color?: keyof typeof ButtonColor
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  tabIndex?: number
  ref?: RefObject<HTMLButtonElement> | null
  onClick?(event: MouseEvent<HTMLButtonElement>): void
  className?: string
}

const button = cva(
  'inline-flex cursor-pointer select-none items-center justify-center rounded-xl px-7 py-3.5 font-medium leading-none transition-all',
  {
    variants: {
      color: {
        primary: 'border-r-black bg-black text-white ' + styles.primary,
        secondary: '',
        accept: 'border-r-green-light bg-green-light text-white ' + styles.accept,
        danger: 'bg-red-500 text-white ' + styles.danger
      },
      disabled: {
        true: 'cursor-not-allowed opacity-75'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },
    defaultVariants: {
      color: 'primary',
      fullWidth: false
    }
  }
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    loading,
    children,
    color,
    startIcon,
    endIcon,
    type = 'button',
    fullWidth,
    className,
    disabled,
    ...otherProps
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={button({ color, disabled, fullWidth, class: className })}
      disabled={loading || disabled}
      {...otherProps}
    >
      {!loading && startIcon}
      {loading ? (
        <div className="flex size-[1lh] justify-center border-r-inherit">
          <Loader adaptive />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
})
