import { ReactNode, forwardRef, RefObject, MouseEvent } from 'react'
import clsx from 'clsx'
import { Loader } from '../loader'

import styles from './styles.module.scss'

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
  withShadow?: boolean
  tabIndex?: number
  ref?: RefObject<HTMLButtonElement> | null
  onClick?(event: MouseEvent<HTMLButtonElement>): void
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    loading,
    children,
    color,
    withShadow = false,
    startIcon,
    endIcon,
    type = 'button',
    fullWidth,
    className,
    ...otherProps
  },
  ref
) {
  let colorClass: string

  switch (color as ButtonColor) {
    case ButtonColor.secondary:
      colorClass = styles.secondary
      break
    case ButtonColor.accept:
      colorClass = styles.accept
      break
    case ButtonColor.danger:
      colorClass = styles.danger
      break

    default:
      colorClass = styles.primary
      break
  }

  return (
    <button
      ref={ref}
      className={clsx(
        {
          [styles.base]: true,
          [styles.fullWidth]: fullWidth,
          [styles.withShadow]: withShadow
        },
        colorClass,
        className
      )}
      type={type}
      disabled={loading || otherProps.disabled}
      {...otherProps}
    >
      {!loading && startIcon}
      {loading ? (
        <div className={styles.loader}>
          <Loader adaptive />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
})
