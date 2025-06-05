import { OrderListItemSkeleton } from '@/components/order/list-item.skeleton'

export function OrdersSkeleton({ len = 10 }: { len?: number }) {
  return (
    <ul>
      {[...Array(len)].map((_, index) => (
        <li key={index} className="mb-0.5 last:mb-0">
          <OrderListItemSkeleton />
        </li>
      ))}
    </ul>
  )
}
