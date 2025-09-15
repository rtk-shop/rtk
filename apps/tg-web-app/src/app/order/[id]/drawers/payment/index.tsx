import dynamic from 'next/dynamic'
import { Drawer } from '@/components/ui/drawer'
import { usePageState } from '../../lib/state'

const PaymentInfo = dynamic(() => import('./info'), {
  ssr: false,
  loading: () => null
})

export function PaymentDrawer({
  orderId,
  orderPrice,
  deliveryCost
}: {
  orderId: string
  orderPrice: number
  deliveryCost: number
}) {
  const paymentDrawer = usePageState((state) => state.paymentDrawer)
  const setPaymentDrawer = usePageState((state) => state.setPaymentDrawer)

  const handleDrawerClose = () => {
    setPaymentDrawer({ open: false })
  }

  return (
    <Drawer open={paymentDrawer.open} position="bottom" onClose={handleDrawerClose}>
      <div className="h-[530px] rounded-t-2xl bg-white px-3 py-4">
        {paymentDrawer.open && (
          <PaymentInfo
            mode={paymentDrawer.mode}
            type={paymentDrawer.type}
            orderId={orderId}
            price={orderPrice}
            deliveryCost={deliveryCost}
            onClose={handleDrawerClose}
          />
        )}
      </div>
    </Drawer>
  )
}
