'use client'

import { useRef, useState } from 'react'
import { usePageState } from './model/page-state'
import { useQuery } from 'urql'
import { Icon } from '@/components/ui/icon'
import { OrderItem } from '@/components/order-item'
import OrderSkeletonList from '@/components/ui/order-skeleton-list'
import { OrderItemSkeleton } from '@/components/order-item/skeleton'
import {
  UserOrdersQuery,
  UserOrdersQueryVariables,
  UserOrdersDocument
} from '@/lib/api/graphql/_gen_/userOrders.query'

export function Orders() {
  const listRef = useRef<HTMLUListElement>(null)

  const openRejectModal = usePageState((state) => state.onRejectOrderModal)
  const setCurrentOrderId = usePageState((state) => state.setCurrentOrderId)

  const [expandedOrder, setExpandedOrder] = useState({
    index: 0,
    expanded: true
  })

  const [result] = useQuery<UserOrdersQuery, UserOrdersQueryVariables>({
    query: UserOrdersDocument
  })

  const { data, fetching, error } = result

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

  const handleOrderReject = (orderId: string) => {
    openRejectModal(true)
    setCurrentOrderId(orderId)
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

  if (data?.userOrders.length === 0) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="common/emptycart" className="mb-3 text-[230px]" />
          <p className="text-lg">Список закакоз пуст</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="action/warning" className="mb-1 text-[39px]" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
  }

  return (
    <section>
      <ul ref={listRef} className="overflow-y-auto">
        {/* <OrderItemSkeleton expanded /> */}
        {data?.userOrders.map((order, index) => (
          <li key={index} className="mb-3">
            <OrderItem
              currentIndex={index}
              order={{ ...order }}
              expandIndex={expandedOrder.index}
              isExpanded={expandedOrder.expanded}
              onExpand={handleOrderExpand}
              onReject={handleOrderReject}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
