import { Box } from '@/components/ui/box'
import { getOrder } from '@/lib/api'
import { notFound } from 'next/navigation'
import { OrderHeader } from './header'
import { Receiver } from './receiver'
import { Delivery } from './delivery'
import { Products } from './products'
import { Payment } from './controls/payment'
import { calculateDeliveryCost } from './lib/utils'
import { RejectOrderButton } from './controls/reject-button'
import { TelegramAppWidgets } from './telegram'
import { Price } from './price'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error, data } = await getOrder(id)

  if (error) throw new Error(error.message)
  if (!data) throw new Error('unexpected error [no data, no error]')

  const order = data.order

  if (order.__typename === 'NotFound') notFound()

  const deliveryCost = calculateDeliveryCost(order.products)

  return (
    <>
      <style precedence="high">
        {`
          body {
            background-color: var(--color-gray-50);
            min-height: 100dvh;
          }
        `}
      </style>
      <Box className="px-2">
        <OrderHeader orderId={order.id} createdAt={order.createdAt} />
        <Price
          orderPrice={order.price}
          paymentMethod={order.paymentMethod}
          orderStatus={order.status}
          payment={
            <Payment
              orderId={order.id}
              orderStatus={order.status}
              orderPaymentMethod={order.paymentMethod}
            />
          }
        />
        <Delivery
          city={order.cityName}
          postOffice={order.postOfficeName}
          supplier={order.supplier}
          parcelTrackId={order.parcelTrackId}
          status={order.status}
        />
        <Receiver
          name={order.receiverName}
          surname={order.receiverSurname}
          phone={order.receiverPhone}
        />
        <Products deliveryCost={deliveryCost} orderPrice={order.price} products={order.products} />

        {/* <RejectOrderButton orderStatus={order.status} /> */}
        <TelegramAppWidgets />
      </Box>
    </>
  )
}
