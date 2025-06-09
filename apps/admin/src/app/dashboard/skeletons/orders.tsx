import { OrderListItemSkeleton } from '@/components/order/list-item.skeleton'

export function OrdersSkeleton({ len = 10 }: { len?: number }) {
  return (
    <ul>
      {[...Array(len)].map((_, index) => (
        <li key={index} className="mb-px last:mb-0 sm:mb-0.5">
          <OrderListItemSkeleton />
        </li>
      ))}
    </ul>
  )
}
