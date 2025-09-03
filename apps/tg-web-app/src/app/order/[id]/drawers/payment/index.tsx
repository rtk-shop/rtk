import dynamic from 'next/dynamic'
import { Drawer } from '@/components/ui/drawer'
import { usePageState } from '../../lib/state'

const PaymentInfo = dynamic(() => import('./info'), {
  ssr: false,
  loading: () => null
})

export function PaymentDrawer({ orderId, orderPrice }: { orderId: string; orderPrice: number }) {
  const isOpen = usePageState((state) => state.isPaymentModalOpen)
  const setPaymentModalOpen = usePageState((state) => state.setPaymentModalOpen)

  const handleDrawerClose = () => {
    setPaymentModalOpen(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleDrawerClose}>
      <div className="h-[530px] rounded-t-2xl bg-white px-3 py-4">
        {isOpen && (
          <PaymentInfo orderId={orderId} orderPrice={orderPrice} onClose={handleDrawerClose} />
        )}
      </div>
    </Drawer>
  )
}
