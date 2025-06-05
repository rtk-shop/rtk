'use client'

import { Icon } from '@/components/ui/icon'
import { OrderListItem } from '@/components/order/list-item'
import { useOrders } from '@/lib/api/hooks'
import { OrdersSkeleton } from './skeletons/orders'

const FIRST = 7

export function Orders() {
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
        <div className="flex h-full flex-col items-center justify-center rounded-lg text-gray-700">
          <Icon name="common/warning" className="mb-1 text-[39px]" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
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
          />
        ))}
      </ul>
    </section>
  )
}
