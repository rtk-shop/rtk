'use client'

import { useRef, ReactNode, MouseEvent } from 'react'
import { cva } from 'cva'
import { Loader } from '@repo/ui'

import styles from './styles.module.css'

export interface IconButtonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  children: ReactNode
  loading?: boolean
  disabled?: boolean // TODO: disabled styles
  withRipple?: boolean
  className?: string
  hapticFeedback?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

const button = cva(
  'relative m-0 inline-flex flex-initial cursor-pointer items-center justify-center overflow-visible rounded-full border-none bg-transparent p-3 text-center align-middle text-2xl text-inherit no-underline outline-0 select-none'
)

export function IconButton({
  loading,
  children,
  withRipple = false,
  hapticFeedback,
  type = 'button',
  onClick,
  className,
  ...otherProps
}: IconButtonProps) {
  const rippleEl = useRef<HTMLSpanElement | null>(null)

  const handleRippleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (withRipple) {
      const button = event.currentTarget
      const circle = document.createElement('span')
      const diameter = Math.max(button.clientWidth, button.clientHeight)
      circle.style.width = circle.style.height = `${diameter}px`

      // NOTE: The Tailwind can't scan multiple classes in DOM
      // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
      circle.classList.add(styles['button-ripple'])

      if (rippleEl.current) {
        rippleEl.current.remove()
      }

      rippleEl.current = circle

      button.appendChild(circle)
    }

    if (hapticFeedback) {
      if (typeof window !== 'undefined' && window.Telegram) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(hapticFeedback)
      }
    }

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      className={button({ className })}
      onClick={handleRippleClick}
      type={type}
      {...otherProps}
    >
      {loading ? (
        <div className="size-1e flex justify-center border-r-black">
          <Loader adaptive color="secondary" />
        </div>
      ) : (
        <span className="flex w-full">{children}</span>
      )}
    </button>
  )
}
