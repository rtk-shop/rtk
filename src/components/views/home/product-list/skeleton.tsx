import { Skeleton } from '@/components/product-item/skeleton'
import styles from './styles.module.scss'

export function ListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {[...Array(count)].map((_, ind) => (
          <li key={ind} className={styles.productWrapper}>
            <Skeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
