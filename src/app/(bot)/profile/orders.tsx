'use client'

import { useState } from 'react'
import { useQuery } from 'urql'
import {
  UserOrdersQuery,
  UserOrdersQueryVariables,
  UserOrdersDocument
} from '@/lib/api/graphql/_gen_/userOrders.query'
import { OrderItem } from '@/components/order-item'

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

  const handleOrderExpand = (orderId: string) => {
    if (expandedOrder.id === orderId) {
      setExpandedOrder((prev) => ({ ...prev, expanded: !prev.expanded }))
      return
    }

    setExpandedOrder({
      id: orderId,
      expanded: true
    })
  }

  console.log(result.data)

  return (
    <section>
      <h1>Заказы</h1>
      <ul>
        {result.data?.userOrders.map((order, index) => (
          <li key={index} className="mb-2">
            <OrderItem
              {...order}
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
