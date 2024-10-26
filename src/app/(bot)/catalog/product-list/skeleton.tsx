import { Skeleton } from '@/components/product-item/skeleton'

export function ListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="lg:px-2.5">
      <ul className="flex flex-wrap">
        {[...Array(count)].map((_, ind) => (
          <li key={ind} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
            <Skeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
