import { CartItemSkeleton } from '@/components/cart-item/skeleton'
import styles from './styles.module.scss'

interface ListSkeletonProps {
  itemsAmount: number
  max?: number
}

export function ListSkeleton({ itemsAmount, max = 4 }: ListSkeletonProps) {
  const itemsLength = itemsAmount > max ? max : itemsAmount

  return (
    <ul className={styles.skeletonList}>
      {[...Array(itemsLength)].map((_, index: number) => (
        <CartItemSkeleton key={index} />
      ))}
    </ul>
  )
}
