import { memo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { OrderItem } from '@/components/order/item'
import { OrderItemSkeleton } from '@/components/order/item/skeleton'
import { type OrderType } from '@/types/order'
import OrderSkeletonList from '@/components/ui/order-skeleton-list'

export interface OrdersListProps {
  fetching: boolean
  error: unknown | undefined
  orders: OrderType[]
}

export const OrdersList = memo(function OrdersList({ fetching, error, orders }: OrdersListProps) {
  const listRef = useRef<HTMLUListElement>(null)

  const [expandedOrder, setExpandedOrder] = useState({
    index: 0,
    expanded: true
  })

  const handleOrderExpand = (index: number) => {
    if (listRef.current) {
      listRef.current.scroll({
        top: index * 46 + (index > 0 ? 12 : 0),
        left: 0,
        behavior: 'smooth'
      })
    }

    if (expandedOrder.index === index) {
      setExpandedOrder((prev) => ({ ...prev, expanded: !prev.expanded }))
      return
    }

    setExpandedOrder({
      index: index,
      expanded: true
    })
  }

  if (fetching) {
    return (
      <div className="">
        <div className="mb-2.5">
          <OrderItemSkeleton expanded />
        </div>
        <OrderSkeletonList len={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="action/warning" className="mb-1 size-16" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="common/emptycart" className="mb-3 text-[230px]" />
          <p className="text-lg">Список закакоз пуст</p>
        </div>
      </div>
    )
  }

  return (
    <ul ref={listRef} className="h-full overflow-y-auto">
      {orders.map((order, index) => (
        <li key={index} className="mb-3">
          <OrderItem
            currentIndex={index}
            order={{ ...order }}
            expandIndex={expandedOrder.index}
            isExpanded={expandedOrder.expanded}
            onExpand={handleOrderExpand}
          />
        </li>
      ))}
    </ul>
  )
})
