'use client'

import { Button } from '@/components/ui/button'
import { usePageState } from '../lib/state'
import { Icon } from '@/components/ui/icon'
import { useOrderPayment } from '@/lib/api/hooks'
import { PaymentStatusBadge } from './status-badge'
import { Loader } from '@/components/ui/loader'
import { IconButton } from '@/components/ui/icon-button'
import { isDataDefined } from '@/lib/api/helpers'
import { OrderStatus, OrderPaymentMethod, PaymentPurpose } from '@/lib/api/graphql/types'

const statusesForPayment: OrderStatus[] = [OrderStatus.Processed, OrderStatus.Sent]

export interface PaymentProps {
  orderId: string
  orderStatus: OrderStatus
  orderPaymentMethod: OrderPaymentMethod
}

export function Payment({ orderId, orderStatus, orderPaymentMethod }: PaymentProps) {
  const setPaymentDrawer = usePageState((state) => state.setPaymentDrawer)

  const [{ error, fetching, data }] = useOrderPayment({
    variables: { orderId }
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

  const payment = data.orderPayment.__typename === 'Payment' ? data.orderPayment : null

  return (
    <div className="mt-6">
      {payment && orderStatus !== OrderStatus.Done ? (
        <>
          <div className="absolute top-1 right-1">
            <IconButton
              className="text-xl"
              onClick={() =>
                setPaymentDrawer({
                  open: true,
                  mode: 'reminder',
                  type: payment.purpose
                })
              }
            >
              <Icon name="action/circle-info" />
            </IconButton>
          </div>
          <PaymentStatusBadge status={payment.status} />
        </>
      ) : (
        <Button
          color="accept"
          fullWidth
          className="rounded-lg! pt-1.5 pb-1.5 text-sm"
          disabled={!statusesForPayment.includes(orderStatus)}
          onClick={() =>
            setPaymentDrawer({
              open: true,
              mode: 'payment',
              type:
                orderPaymentMethod === OrderPaymentMethod.Online
                  ? PaymentPurpose.DeliveryAndOrder
                  : PaymentPurpose.Delivery
            })
          }
        >
          {orderPaymentMethod === OrderPaymentMethod.Online
            ? 'Оплатить заказ'
            : 'Оплатить доставку'}
        </Button>
      )}
    </div>
  )
}
