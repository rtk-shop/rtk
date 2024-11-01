import { useRef, ReactNode, MouseEvent } from 'react'
import { cva } from 'cva'
import { Loader } from '../loader'

import styles from './styles.module.css'

interface IconButtonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  children: ReactNode
  loading?: boolean
  disabled?: boolean // TODO: disabled styles
  disableRipple?: boolean
  className?: string
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

const button = cva(
  'relative m-0 inline-flex flex-initial cursor-pointer select-none items-center justify-center overflow-visible rounded-full border-none bg-transparent p-3 text-center align-middle text-2xl text-inherit no-underline outline-0'
)

export function IconButton({
  loading,
  children,
  disableRipple = false,
  type = 'button',
  onClick,
  className,
  ...otherProps
}: IconButtonProps) {
  const rippleEl = useRef<HTMLSpanElement | null>(null)

  const handleRippleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disableRipple) {
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
        <div className="flex size-1e justify-center border-r-black">
          <Loader adaptive />
        </div>
      ) : (
        <span className="flex w-full">{children}</span>
      )}
    </button>
  )
}
