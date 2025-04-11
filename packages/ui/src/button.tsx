import React from 'react'
import { cva } from 'cva'
import { Loader } from './loader'

export const enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  accept = 'accept',
  danger = 'danger'
}

export interface ButtonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  color?: keyof typeof ButtonColor
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  tabIndex?: number
  ref?: React.RefObject<HTMLButtonElement> | null
  onClick?(): void
  hapticFeedback?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
  className?: string
}

const button = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-xl px-7 py-3.5 leading-none font-medium transition-all select-none disabled:pointer-events-none',
  {
    variants: {
      color: {
        primary: 'border-r-black bg-black text-white hover:bg-[#383838] active:bg-[#383838]',
        secondary: '',
        accept:
          'border-r-green-lime bg-green-lime text-stone-800 hover:bg-[#48ff90] active:bg-[#48ff90]',
        danger: 'bg-red-500 text-white' // todo: pick color
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
    },
    compoundVariants: [
      {
        color: 'accept',
        disabled: true,
        className: 'text-stone-600!'
      }
    ]
  }
)

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>(function Button(
  {
    loading,
    children,
    color,
    startIcon,
    endIcon,
    type = 'button',
    hapticFeedback,
    fullWidth,
    className,
    disabled,
    onClick,
    ...otherProps
  },
  ref
) {
  const clickHandler = () => {
    if (hapticFeedback) {
      if (typeof window !== 'undefined' && window.Telegram) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(hapticFeedback)
      }
    }

    onClick && onClick()
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={clickHandler}
      className={button({ color, disabled, fullWidth, class: className })}
      disabled={loading || disabled}
      {...otherProps}
    >
      {!loading && startIcon}
      {loading ? (
        <div className="flex size-[1lh] justify-center border-r-inherit">
          <Loader adaptive color={color !== 'primary' ? 'light' : 'dark'} />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
})
