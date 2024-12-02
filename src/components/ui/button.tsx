import { type ReactNode, type MouseEvent, type RefObject, forwardRef } from 'react'
import { cva } from 'cva'
import { Loader } from './loader'

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
  'inline-flex cursor-pointer select-none items-center justify-center rounded-xl px-7 py-3.5 font-medium leading-none transition-all disabled:pointer-events-none',
  {
    variants: {
      color: {
        primary: 'border-r-black bg-black text-white hover:bg-[#383838] active:bg-[#383838]',
        secondary: '',
        accept: 'border-r-green bg-green text-stone-800 hover:bg-[#0eff6d] active:bg-[#0eff6d]',
        danger: 'bg-red-500 text-white hover:bg-[#0eff6d] active:bg-[#0eff6d]' // todo: pick color
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
        className: 'text-stone-500'
      }
    ]
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
          <Loader adaptive color={color !== 'primary' ? 'light' : 'dark'} />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
})
