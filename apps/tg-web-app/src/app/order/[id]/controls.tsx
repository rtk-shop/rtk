'use client'

import { FormatPrice } from '@/components/ui/format-price'
import { OrderRejectModal } from './drawers/reject-order'
import { Button } from '@/components/ui/button'
import { usePageState } from './lib/state'
import { OrderStatus } from '@/lib/api/graphql/types'
import { PaymentDrawer } from './drawers/payment'

const validStatusesForReject: OrderStatus[] = [OrderStatus.Created, OrderStatus.Processed]

export interface OrderControlsProps {
  orderId: string
  status: OrderStatus
  orderPrice: number
}

export function OrderControls({ orderId, orderPrice, status }: OrderControlsProps) {
  const setRejectModalOpen = usePageState((state) => state.setRejectModalOpen)
  const setPaymentModalOpen = usePageState((state) => state.setPaymentModalOpen)

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Сумма</h2>
        <div>
          <FormatPrice price={orderPrice} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Статус</h2>
        <div>{status}</div>
      </div>
      <div>
        <Button color="accept" fullWidth className="mb-4" onClick={() => setPaymentModalOpen(true)}>
          Оплатить заказ
        </Button>
        {validStatusesForReject.includes(status) && (
          <Button
            color="secondary"
            fullWidth
            onClick={() => setRejectModalOpen(true)}
            className="bg-gray-200 pt-3 pb-3"
          >
            Отменить заказ
          </Button>
        )}
      </div>

      <OrderRejectModal orderId={orderId} />
      <PaymentDrawer orderId={orderId} orderPrice={orderPrice} />
    </section>
  )
}
