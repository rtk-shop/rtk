import { Modal } from '@/components/layout/modal'

interface ErrorModalProps {
  open: boolean
}

export function ErrorModal({ open }: ErrorModalProps) {
  return <Modal open={open}>SomethingWrong Modal</Modal>
}
