import { Modal } from '@/components/layout/modal'

interface OrderSuccessModalProps {
  open: boolean
  onClose(): void
}

export function OrderSuccessModal({ open, onClose }: OrderSuccessModalProps) {
  return (
    <Modal open={open}>
      <div>Order Success modal</div>
    </Modal>
  )
}
