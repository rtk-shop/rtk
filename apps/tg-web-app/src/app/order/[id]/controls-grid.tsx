import { type ReactNode } from 'react'
import { OrderRejectModal } from './drawers/reject-order'
import { OrderPaymentMethod, OrderStatus } from '@/lib/api/graphql/types'
import { PaymentDrawer } from './drawers/payment'
import { OrderStatusBadge } from '@/components/order/status-badge'
import { FormatPrice } from '@/components/ui/format-price'
import { OrderPaymentMethodBadge } from '@/components/order/payment-method'

export interface ControlsGridProps {
  orderId: string
  status: OrderStatus
  orderPrice: number
  payment: ReactNode
  paymentMethod: OrderPaymentMethod
  deliveryCost: number
}

export function ControlsGrid({
  orderId,
  orderPrice,
  status,
  payment,
  paymentMethod,
  deliveryCost
}: ControlsGridProps) {
  return (
    <section className="mb-4">
      <div className="mb-4 grid grid-cols-5 grid-rows-6 gap-2">
        <div className="relative col-span-3 row-span-6 rounded-lg bg-white p-3 shadow-sm">
          <p className="text-lg font-medium text-gray-500">Сумма:</p>
          <FormatPrice size="XXL" currency="грн" price={orderPrice} />
          {payment}
        </div>
        <div className="col-span-2 col-start-4 row-span-3 rounded-lg bg-white p-2 shadow-sm">
          <p className="mb-1 text-sm font-medium text-gray-500">Статус:</p>
          <OrderStatusBadge status={status} />
        </div>
        <div className="col-span-2 col-start-4 row-span-3 rounded-lg bg-white p-2 shadow-sm">
          <p className="mb-1 text-sm font-medium text-gray-500">Оплата:</p>
          <OrderPaymentMethodBadge method={paymentMethod} />
        </div>
      </div>
      <OrderRejectModal orderId={orderId} />
      <PaymentDrawer orderId={orderId} deliveryCost={deliveryCost} orderPrice={orderPrice} />
    </section>
  )
}
