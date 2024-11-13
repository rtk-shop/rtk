import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cva } from 'cva'
import { createPortal } from 'react-dom'
import { Backdrop } from './backdrop'

interface DrawerProps {
  open: boolean
  fullWidth?: boolean
  position?: 'left' | 'right' | 'bottom'
  onClose(): void
  children?: ReactNode
}

const container = cva('fixed z-50 overflow-auto transition-transform will-change-transform', {
  variants: {
    position: {
      right: 'right-0 top-0 h-dvh',
      left: 'left-0 top-0 h-dvh',
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

  useEffect(() => {
    const updatePageScroll = () => {
      if (open) {
        document.documentElement.style.overflowY = 'scroll'
        document.documentElement.style.position = 'fixed'
        document.documentElement.style.width = '100%'
      } else {
        document.documentElement.style.overflowY = 'auto'
        document.documentElement.style.position = 'static'
        document.documentElement.style.width = 'auto'
      }
    }

    updatePageScroll()
  }, [open])

  return mounted
    ? createPortal(
        <div>
          <div className={container({ position, open, fullWidth })}>{children}</div>
          {!fullWidth && <Backdrop open={open} onClick={onClose} />}
        </div>,
        portalRootRef.current as Element
      )
    : null
}
