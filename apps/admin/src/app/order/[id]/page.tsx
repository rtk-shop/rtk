import Link from 'next/link'
import { getOrder } from '@/app/actions'
import { Receiver } from './receiver'
import { Delivery } from './delivery'
import { notFound } from 'next/navigation'
import { formatDate } from '@repo/utils'
import { StatusBadge } from '@/components/order/status-badge'

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
    <div className="p-2.5">
      <div className="mb-2.5 flex items-center">
        <h1 className="mr-2.5 text-xl font-medium">Заказ №{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p>
        <span className="font-medium">Создан: </span>&nbsp;
        {formatDate(order.createdAt, { dateStyle: 'short', timeStyle: 'short' })}
      </p>
      <p>
        <span className="font-medium">Обновлен: </span>&nbsp;
        {formatDate(order.updatedAt, { dateStyle: 'short', timeStyle: 'short' })}
      </p>

      <div className="flex flex-col py-2 sm:flex-row">
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
      <Link className="bg-gray-300" href="/dashboard">
        /dashboard
      </Link>
    </div>
  )
}
