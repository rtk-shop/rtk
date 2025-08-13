import { Drawer } from '@/components/ui/drawer'
import { usePageState } from '../../lib/state'
import { PaymentInfo } from './info'

export function PaymentDrawer({ orderId, orderPrice }: { orderId: string; orderPrice: number }) {
  const isOpen = usePageState((state) => state.isPaymentModalOpen)
  const setPaymentModalOpen = usePageState((state) => state.setPaymentModalOpen)

  const handleDrawerClose = () => {
    setPaymentModalOpen(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleDrawerClose}>
      <div className="h-[420px] rounded-t-2xl bg-white px-3 py-4">
        <PaymentInfo orderId={orderId} orderPrice={orderPrice} onClose={handleDrawerClose} />
      </div>
    </Drawer>
  )
}
