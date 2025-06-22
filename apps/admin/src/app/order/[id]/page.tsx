'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Receiver } from './receiver'
import { Delivery } from './delivery'
import { formatDate, formatPrice } from '@repo/utils'
import { StatusBadge } from '@/components/order/status-badge'
import { OrderProduct } from '@/components/order-product'
import { Controls } from './controls'
import { useOrder } from '@/lib/api/hooks'
import { Loader } from '@repo/ui'

export default function Page() {
  const params = useParams<{ id: string }>()

  const [{ fetching, data, error }] = useOrder({
    variables: {
      id: params.id
    }
  })

  if (fetching) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Loader color="secondary" />
      </div>
    )
  }

  if (error || !data) {
    return <div>error</div>
  }

  if (data?.order.__typename === 'NotFound') {
    return <div>not fonud</div>
  }

  const { order } = data

  return (
    <div className="p-2.5">
      <div className="mb-2.5 flex items-center">
        <Link href="/dashboard" className="mr-2.5 text-xl font-medium">
          Заказ №{order.id}
        </Link>
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
      <div className="mb-2.5 flex flex-col py-2 sm:flex-row">
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
      <Controls orderId={order.id} />
      <section>
        <div className="mb-3 flex items-center justify-between font-medium">
          <h2 className="text-2xl">Товары</h2>
          <span className="text-lg">Итого {formatPrice(order.price)}₴</span>
        </div>
        <div>
          <ul>
            {order.products.map(({ id, quantity, priceAtOrder, product }) => (
              <li key={id} className="mb-2.5">
                <OrderProduct
                  quantity={quantity}
                  priceAtOrder={priceAtOrder}
                  product={{ ...product }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
