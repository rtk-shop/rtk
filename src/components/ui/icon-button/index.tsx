import { useRef, ReactNode, MouseEvent } from 'react'
import clsx from 'clsx'
import { Loader } from '../loaderV2'

import styles from './styles.module.scss'

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
      className={clsx(styles.button, className)}
      onClick={handleRippleClick}
      type={type}
      {...otherProps}
    >
      {loading ? (
        <div className={styles.loader}>
          <Loader adaptive />
        </div>
      ) : (
        <span className={styles.inner}>{children}</span>
      )}
    </button>
  )
}
