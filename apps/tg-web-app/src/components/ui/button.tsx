import React from 'react'
import { cva } from 'cva'
import { Loader } from '@repo/ui'

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
  'cursor-pointer rounded-xl px-7 py-2.5 font-medium transition-all select-none disabled:pointer-events-none',
  {
    variants: {
      color: {
        primary: 'bg-black text-white hover:bg-[#383838] active:bg-[#383838]',
        secondary: '',
        accept: 'bg-green-lime text-stone-800 hover:bg-[#48ff90] active:bg-[#48ff90]',
        danger: 'bg-red-500 text-white'
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

export function Button({
  loading,
  children,
  color = 'primary',
  startIcon,
  endIcon,
  type = 'button',
  hapticFeedback,
  fullWidth,
  className,
  disabled,
  onClick,
  ...otherProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
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
      ref={otherProps.ref}
      type={type}
      onClick={clickHandler}
      className={button({ color, disabled, fullWidth, class: className })}
      disabled={loading || disabled}
      {...otherProps}
    >
      {loading ? (
        <div className="flex justify-center">
          <div className="size-[1lh]">
            <Loader adaptive color={color} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {startIcon}
          <span>{children}</span>
          {endIcon}
        </div>
      )}
    </button>
  )
}
