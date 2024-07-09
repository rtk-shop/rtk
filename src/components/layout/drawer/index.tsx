import { useEffect, useRef, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import styles from './styles.module.scss'

interface DrawerProps {
  open: boolean
  position?: 'left' | 'right'
  onClose(): void
  children?: ReactNode
}

export function Drawer({ open, children, onClose, position = 'left' }: DrawerProps) {
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
          <div
            className={clsx({
              [styles.box]: true,
              [styles.left]: position === 'left',
              [styles.leftOpen]: position === 'left' && open,
              [styles.right]: position === 'right',
              [styles.rightOpen]: position === 'right' && open
            })}
          >
            {children}
          </div>
          <div
            className={clsx({
              [styles.backdrop]: true,
              [styles.backdropOpen]: open
            })}
            onClick={onClose}
          />
        </div>,
        portalRootRef.current as Element
      )
    : null
}
