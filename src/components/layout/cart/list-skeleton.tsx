import { CartItemSkeleton } from '@/components/cart-item/skeleton'

interface ListSkeletonProps {
  itemsAmount: number
  max?: number
}

export function ListSkeleton({ itemsAmount, max = 4 }: ListSkeletonProps) {
  const itemsLength = itemsAmount > max ? max : itemsAmount

  return (
    <ul className="w-full grow overflow-y-hidden">
      {[...Array(itemsLength)].map((_, index: number) => (
        <CartItemSkeleton key={index} />
      ))}
    </ul>
  )
}
