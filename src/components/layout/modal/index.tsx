import { ReactNode } from 'react'
import ReactModal from 'react-modal'

import styles from './styles.module.scss'

interface ModalProps {
  open: boolean
  children: ReactNode
}

export function Modal({ open, children }: ModalProps) {
  return (
    <ReactModal isOpen={open} className={styles.content} overlayClassName={styles.overlay}>
      {children}
    </ReactModal>
  )
}
