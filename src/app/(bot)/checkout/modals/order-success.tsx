import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'

interface OrderSuccessModalProps {
  open: boolean
  onClose(): void
}

export function OrderSuccessModal({ open, onClose }: OrderSuccessModalProps) {
  return (
    <Drawer open={open} position="bottom" onClose={onClose}>
      <div className="h-64 rounded-t-2xl bg-white p-4">
        <div className="flex h-full items-center justify-center">
          <div>
            <Button onClick={onClose}>Хорошо</Button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
