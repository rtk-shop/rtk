'use client'

import { Button } from '@/components/ui/button'
import { usePageState } from '../lib/state'
import { OrderStatus, OrderPaymentMethod, PaymentStatus } from '@/lib/api/graphql/types'
import { Icon } from '@/components/ui/icon'
import { useOrderPayment } from '@/lib/api/hooks'
import { PaymentStatusBadge } from './status-badge'
import { Loader } from '@repo/ui'
import { isDataDefined } from '@/lib/api/helpers'

const statusesForPayment: OrderStatus[] = [OrderStatus.Processed, OrderStatus.Sent]

export interface PaymentProps {
  orderId: string
  status: OrderStatus
  paymentMethod: OrderPaymentMethod
}

export function Payment({ orderId, status, paymentMethod }: PaymentProps) {
  const setPaymentModalOpen = usePageState((state) => state.setPaymentModalOpen)

  const [{ error, fetching, data }] = useOrderPayment({
    variables: { orderId: orderId },
    pause: paymentMethod !== OrderPaymentMethod.Online
  })

  if (fetching) {
    return (
      <div className="mt-6 flex h-8 items-center justify-center">
        <div className="size-6">
          <Loader color="secondary" adaptive />
        </div>
      </div>
    )
  }

  if (!isDataDefined(data) || error) {
    return (
      <div className="mt-6 flex h-8 items-center justify-center">
        <div className="flex items-center font-medium">
          <Icon name="action/warning" className="mr-1 text-2xl text-red-700" />
          <p>Ошибка</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {paymentMethod === OrderPaymentMethod.Online && (
        <div className="mt-6">
          {data?.orderPayment.__typename === 'NotFound' ? (
            <Button
              color="accept"
              fullWidth
              className="rounded-lg! pt-1.5 pb-1.5 text-sm"
              disabled={!statusesForPayment.includes(status)}
              onClick={() => setPaymentModalOpen(true)}
            >
              Оплатить заказ
            </Button>
          ) : (
            <PaymentStatusBadge status={data.orderPayment.status} />
          )}
        </div>
      )}
    </div>
  )
}
