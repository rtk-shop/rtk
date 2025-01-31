import { ProductItem, type ProductItemProps } from '../product-item'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'
import { ProductListSkeleton } from './product-list-skeleton'

export interface ProductList {
  data: ProductItemProps[] | undefined
  fetching: boolean
  skeletonLen: number
  error: unknown
  refetch(): void
}

export function ProductList({ data, fetching, error, skeletonLen, refetch }: ProductList) {
  if (fetching) return <ProductListSkeleton len={skeletonLen || 8} />

  if (error) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="action/warning" className="mb-1 text-[47px]" />
          <p className="mb-3 text-lg">Ошибка получения данных</p>
          <Button onClick={refetch}>Повторить</Button>
        </div>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg text-gray-500">
          <Icon name="common/emptycart" className="mb-4 text-[230px]" />
          <p className="text-lg font-semibold">Список избранного пуст</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <ul className="flex flex-wrap">
        {data.map((product) => (
          <li key={product.id} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
            <ProductItem
              id={product.id}
              preview={product.preview}
              title={product.title}
              basePrice={product.basePrice}
              currentPrice={product.currentPrice}
              inStock={product.inStock}
              tag={product.tag}
              withDelete
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
