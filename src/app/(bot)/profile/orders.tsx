'use client'

import { useRef, useState } from 'react'
import { useQuery } from 'urql'
import {
  UserOrdersQuery,
  UserOrdersQueryVariables,
  UserOrdersDocument
} from '@/lib/api/graphql/_gen_/userOrders.query'
import { OrderItem } from '@/components/order-item'
import OrderSkeletonList from '@/components/ui/order-skeleton-list'

export function Orders({}: {}) {
  const [expandedOrder, setExpandedOrder] = useState({
    id: '',
    expanded: false
  })

  const [result] = useQuery<UserOrdersQuery, UserOrdersQueryVariables>({
    query: UserOrdersDocument,
    variables: {
      userId: '1'
    }
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const { fetching } = result

  const handleOrderExpand = (orderId: string, index: number) => {
    if (containerRef.current) {
      containerRef.current.scroll({
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

  if (fetching) {
    return (
      <div className="h-[300px]">
        <OrderSkeletonList len={6} />
      </div>
    )
  }

  // console.log(result)

  return (
    <section ref={containerRef} className="h-[300px] overflow-y-auto">
      <ul className="">
        {result.data?.userOrders.map((order, index) => (
          <li key={index} className="mb-3">
            <OrderItem
              {...order}
              index={index}
              expandId={expandedOrder.id}
              isExpanded={expandedOrder.expanded}
              onExpand={handleOrderExpand}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
