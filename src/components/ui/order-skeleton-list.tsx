import { OrderItemSkeleton } from '../order-item/skeleton'

export default function OrderSkeletonList({ len = 8 }: { len?: number }) {
  return (
    <ul className="*:mb-3">
      {[...Array(len)].map((_, index: number) => (
        <li key={index}>
          <OrderItemSkeleton />
        </li>
      ))}
    </ul>
  )
}
