import { type ReactNode } from 'react'
import { ProductItem, type ProductItemProps } from '@/components/product/item'
import { Icon } from '@/components/ui/icon'
import { ProductListSkeleton } from './skeleton'
import { ServerFetchError } from '@/components/ui/server-fetch-error'

export interface ProductList {
  data: ProductItemProps[] | undefined
  fetching: boolean
  skeletonLen: number
  error: unknown
  noDataMsg: ReactNode
  errMsg: ReactNode
}

export function ProductList({
  data,
  fetching,
  error,
  skeletonLen,
  noDataMsg,
  errMsg
}: ProductList) {
  if (fetching) return <ProductListSkeleton len={skeletonLen || 8} />

  if (error) {
    return (
      <div className="h-full">
        <ServerFetchError message={errMsg} />
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg text-black">
          <Icon name="common/emptycart" className="mb-4 text-[230px]" />
          <p className="text-lg font-medium">{noDataMsg}</p>
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
