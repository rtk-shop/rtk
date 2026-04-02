'use client'

import React, { forwardRef } from 'react'
import { cva } from 'cva'
import { Loader } from '@/components/ui/loader'
import clsx from 'clsx'

export type buttonVariants = 'primary' | 'secondary' | 'accept' | 'ghost'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  color?: buttonVariants
  type?: 'button' | 'reset' | 'submit'
  hapticFeedback?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
  rounded?: 'lg' | 'xl'
  size?: 'sm' | 'base' | 'lg'
  className?: string
  onClick?(): void
}

const buttonStyles = cva(
  'relative font-medium transition-all select-none disabled:pointer-events-none',
  {
    variants: {
      color: {
        primary: 'bg-black text-white',
        secondary: 'bg-slate-200 text-black',
        accept: 'bg-green-lime text-black active:bg-[#48ff90]',
        ghost: 'bg-slate-100 text-black'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-75'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      },
      rounded: {
        lg: 'rounded-lg',
        xl: 'rounded-xl'
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        base: 'px-2.5 py-2 text-sm',
        lg: 'px-2.5 py-3 text-base'
      }
    },
    defaultVariants: {
      fullWidth: false,
      rounded: 'lg',
      size: 'base'
    },
    compoundVariants: [
      {
        color: 'accept',
        disabled: true,
        className: 'text-stone-700'
      },
      {
        color: 'secondary',
        disabled: true,
        className: 'bg-slate-100! text-gray-400'
      }
    ]
  }
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = 'primary',
    type = 'button',
    loading,
    children,
    hapticFeedback,
    fullWidth,
    className,
    disabled,
    rounded,
    size,
    onClick,
    ...otherProps
  },
  ref
) {
  const handleButtonClick = () => {
    if (hapticFeedback) {
      if (typeof window !== 'undefined' && window.Telegram) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(hapticFeedback)
      }
    }

    if (onClick) onClick()
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={handleButtonClick}
      className={buttonStyles({ color, size, rounded, disabled, fullWidth, class: className })}
      disabled={loading || disabled}
      {...otherProps}
    >
      {loading && (
        <div className="absolute left-1/2 size-[1lh] -translate-x-1/2">
          <Loader size="inline" />
        </div>
      )}
      <div
        className={clsx('flex items-center justify-center', loading ? 'opacity-0' : 'opacity-100')}
      >
        {children}
      </div>
    </button>
  )
})
