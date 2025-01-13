'use client'

import { useRef, useState } from 'react'
import { useQuery } from 'urql'
import { Icon } from '@/components/ui/icon'
import { OrderItem } from '@/components/order-item'
import OrderSkeletonList from '@/components/ui/order-skeleton-list'
import {
  UserOrdersQuery,
  UserOrdersQueryVariables,
  UserOrdersDocument
} from '@/lib/api/graphql/_gen_/userOrders.query'
import { usePageState } from './model/page-state'

export function Orders({ userId }: { userId: string }) {
  const listRef = useRef<HTMLUListElement>(null)

  const openRejectModal = usePageState((state) => state.onRejectOrderModal)
  const setCurrentOrderId = usePageState((state) => state.setCurrentOrderId)

  const [expandedOrder, setExpandedOrder] = useState({
    id: '',
    expanded: false
  })

  const [result] = useQuery<UserOrdersQuery, UserOrdersQueryVariables>({
    query: UserOrdersDocument,
    requestPolicy: 'network-only',
    variables: {
      userId
    }
  })

  const { data, fetching, error } = result

  const handleOrderExpand = (orderId: string, index: number) => {
    if (listRef.current) {
      listRef.current.scroll({
        top: index * 46 + (index > 0 ? 12 : 0),
        left: 0,
        behavior: 'smooth'
      })
    }

    if (expandedOrder.id === orderId) {
      setExpandedOrder((prev) => ({ ...prev, expanded: !prev.expanded }))
      return
    }

    setExpandedOrder({
      id: orderId,
      expanded: true
    })
  }

  const handleOrderReject = (orderId: string) => {
    openRejectModal(true)
    setCurrentOrderId(orderId)
  }

  if (fetching) {
    return (
      <div className="h-[305px]">
        <OrderSkeletonList len={6} />
      </div>
    )
  }

  if (data?.userOrders.length === 0) {
    return (
      <div className="h-[305px] pb-3">
        <div className="flex h-full items-center justify-center rounded-lg bg-slate-100">
          <p className="text-lg text-gray-400">Список закакоз пуст</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[305px] pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="action/warning" className="mb-1 text-[39px]" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
  }
  if (data?.userOrders.length === 0) {
    return (
      <div className="h-[305px] pb-3">
        <div className="flex h-full items-center justify-center rounded-lg bg-slate-100 animate-in fade-in">
          <p className="text-lg text-gray-400">Список закакоз пуст</p>
        </div>
      </div>
    )
  }

  return (
    <section>
      <ul ref={listRef} className="h-[305px] overflow-y-auto">
        {data?.userOrders.map((order, index) => (
          <li key={index} className="mb-3">
            <OrderItem
              index={index}
              order={{ ...order }}
              expandId={expandedOrder.id}
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
