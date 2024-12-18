import { ProductSkeleton } from '@/components/product-item/skeleton'

export function ListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="lg:px-2.5">
      <ul className="flex flex-wrap">
        {[...Array(count)].map((_, ind) => (
          <li key={ind} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
            <ProductSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
