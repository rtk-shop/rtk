import { useEffect, useRef, useState, ReactNode } from 'react'
import { cva } from 'cva'
import { createPortal } from 'react-dom'
import { Backdrop } from './backdrop'

interface DrawerProps {
  open: boolean
  fullWidth?: boolean
  position?: 'left' | 'right' | 'bottom'
  onClose?(): void
  children: ReactNode
}

const container = cva('fixed z-50 overflow-auto transition-transform will-change-transform', {
  variants: {
    position: {
      right: 'top-0 right-0 h-dvh',
      left: 'top-0 left-0 h-dvh',
      bottom: 'bottom-0 w-full'
    },

    open: {
      true: '',
      false: ''
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    {
      position: ['right', 'left'],
      open: true,
      className: 'translate-x-0'
    },
    {
      position: 'right',
      open: false,
      className: 'translate-x-full'
    },
    {
      position: 'left',
      open: false,
      className: '-translate-x-full'
    },
    {
      position: 'bottom',
      open: true,
      className: 'translate-y-0'
    },
    {
      position: 'bottom',
      open: false,
      className: 'translate-y-full'
    }
  ]
})

export function Drawer({
  open,
  children,
  onClose,
  position = 'left',
  fullWidth = false
}: DrawerProps) {
  const [mounted, setMounted] = useState(false)

  const bodyContainerRef = useRef<HTMLElement | null>(null)
  const portalRootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    bodyContainerRef.current = document.getElementById('app-drawers')
    portalRootRef.current = document.createElement('div')

    let portal: HTMLElement

    if (bodyContainerRef.current) {
      bodyContainerRef.current.appendChild(portalRootRef.current)
      portal = portalRootRef.current
    }

    setMounted(true)

    return () => {
      portal.remove()
    }
  }, [])

  const onCloseMiddleware = () => {
    document.documentElement.style.overflowY = 'auto'
    onClose && onClose()
  }

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }
  }, [open])

  return mounted
    ? createPortal(
        <div>
          <div className={container({ position, open, fullWidth })}>{children}</div>
          {!fullWidth && <Backdrop open={open} onClick={onCloseMiddleware} />}
        </div>,
        portalRootRef.current as Element
      )
    : null
}
