'use client'

import { FormatPrice } from '@/components/ui/format-price'
import { OrderRejectModal } from './drawers/reject-order'
import { Button } from '@/components/ui/button'
import { usePageState } from './lib/state'
import { OrderStatus } from '@/lib/api/graphql/types'
import { PaymentDrawer } from './drawers/payment'
import { OrderStatusBadge } from '@/components/order/status-badge'
import { formatDate } from '@repo/utils'

const statusesForReject: OrderStatus[] = [OrderStatus.Created, OrderStatus.Processed]
const statusesForPayment: OrderStatus[] = [OrderStatus.Processed, OrderStatus.Sent]

export interface OrderControlsProps {
  orderId: string
  status: OrderStatus
  orderPrice: number
  updatedAt: string
}

export function OrderControls({ orderId, orderPrice, status, updatedAt }: OrderControlsProps) {
  const setRejectModalOpen = usePageState((state) => state.setRejectModalOpen)
  const setPaymentModalOpen = usePageState((state) => state.setPaymentModalOpen)

  return (
    <section className="mb-4">
      <div className="mb-3 grid grid-cols-2 border-b-2">
        <div className="h-22 border-r-2 p-3">
          <h2 className="text-lg font-medium">Сумма:</h2>
          <div>
            <FormatPrice size="XXL" currency="грн." price={orderPrice} />
          </div>
        </div>
        <div className="h-22 p-3">
          <h2 className="text-lg font-medium">Статус:</h2>
          <OrderStatusBadge size="XL" status={status} />
        </div>
      </div>
      <div>
        <Button
          color="accept"
          fullWidth
          className="mb-4"
          disabled={!statusesForPayment.includes(status)}
          onClick={() => setPaymentModalOpen(true)}
        >
          Оплатить заказ
        </Button>
        {statusesForReject.includes(status) && (
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
      <p className="my-1 text-sm text-gray-400">
        Оновлено {formatDate(updatedAt, { dateStyle: 'short', timeStyle: 'short' })}
      </p>
      <OrderRejectModal orderId={orderId} />
      <PaymentDrawer orderId={orderId} orderPrice={orderPrice} />
    </section>
  )
}
