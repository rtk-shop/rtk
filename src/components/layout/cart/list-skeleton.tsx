import { CartItemSkeleton } from '@/components/cart/item/skeleton'

export function ListSkeleton({ len = 4 }: { len?: number }) {
  return (
    <ul className="w-full grow overflow-y-hidden">
      {[...Array(len)].map((_, index: number) => (
        <CartItemSkeleton key={index} />
      ))}
    </ul>
  )
}
