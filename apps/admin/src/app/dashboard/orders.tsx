'use client'

import { useRouter } from 'next/navigation'
import { OrderListItem } from '@/components/order/list-item'
import { useOrders } from '@/lib/api/hooks'
import { OrdersSkeleton } from './skeletons/orders'
import { routeNames } from '@/lib/routes'
import { TriangleAlert } from 'lucide-react'

const FIRST = 7

export function Orders() {
  const router = useRouter()

  const [result] = useOrders({
    variables: {
      first: FIRST
    }
  })

  const { error, fetching, data } = result

  if (fetching) {
    return (
      <section className="mt-5">
        <OrdersSkeleton len={FIRST} />
      </section>
    )
  }

  if (error) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg">
          <TriangleAlert strokeWidth={1.5} className="mb-1 size-14 text-amber-500" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
  }

  const handleOrderClick = (orderId: string) => {
    router.push(routeNames.order + orderId)
  }

  const orders = data?.orders.edges?.map((e) => e?.node) || []

  return (
    <section className="mt-5">
      <ul className="">
        {orders.map((order) => (
          <OrderListItem
            key={order.id}
            id={order.id}
            date={order.createdAt}
            price={order.price}
            status={order.status}
            onClick={() => handleOrderClick(order.id)}
          />
        ))}
      </ul>
    </section>
  )
}
