import Link from 'next/link'
import { getOrder } from '@/lib/api/actions'
import { Receiver } from './receiver'
import { Delivery } from './delivery'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const result = await getOrder(id)

  if (result.error) {
    throw new Error(result.error.message)
  }

  if (!result.data) {
    throw new Error('unexpected error [no data, no error]')
  }

  const order = result.data.order

  if (order.__typename === 'NotFound') notFound()

  return (
    <div>
      <div>Order: {id}</div>
      <Link className="bg-gray-300" href="/dashboard">
        /dashboard
      </Link>

      <div className="flex flex-col p-2 sm:flex-row">
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
      </div>
    </div>
  )
}
