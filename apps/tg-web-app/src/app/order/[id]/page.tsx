import { getOrder } from '@/lib/api'
import { notFound } from 'next/navigation'
import { OrderHeader } from './header'
import { Receiver } from './receiver'
import { Delivery } from './delivery'
import { ControlsGrid } from './controls-grid'
import { OrderProducts } from './products'
import { Payment } from './controls/payment'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error, data } = await getOrder(id)

  if (error) throw new Error(error.message)
  if (!data) throw new Error('unexpected error [no data, no error]')

  const order = data.order

  if (order.__typename === 'NotFound') notFound()

  return (
    <div className="bg-gray-100 px-2 pt-2">
      <OrderHeader orderId={order.id} createdAt={order.createdAt} />
      <Receiver
        name={order.receiverName}
        surname={order.receiverSurname}
        phone={order.receiverPhone}
      />
      <Delivery
        city={order.cityName}
        postOffice={order.postOfficeName}
        supplier={order.supplier}
        parcelTrackId={order.parcelTrackId}
      />
      <ControlsGrid
        orderId={order.id}
        orderPrice={order.price}
        status={order.status}
        updatedAt={order.updatedAt}
        paymentMethod={order.paymentMethod}
        payment={
          <Payment orderId={order.id} status={order.status} paymentMethod={order.paymentMethod} />
        }
      />
      <OrderProducts products={order.products} />
    </div>
  )
}
