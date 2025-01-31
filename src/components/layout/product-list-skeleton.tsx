import { ProductSkeleton } from '../product-item/skeleton'

export function ProductListSkeleton({ len = 6 }: { len?: number }) {
  return (
    <ul className="flex flex-wrap">
      {[...Array(len)].map((_, ind) => (
        <li key={ind} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
          <ProductSkeleton />
        </li>
      ))}
    </ul>
  )
}
