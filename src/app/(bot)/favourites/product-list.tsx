'use client'

import { useFavoriteProductsQuery } from '@/lib/api/hooks'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { ProductList } from '@/components/layout/product-list'

export function Products() {
  const [favouriteAmount] = useFavoriteStore((state) => state.amount)
  const [result, refetch] = useFavoriteProductsQuery()

  const { data, fetching, error } = result

  return (
    <ProductList
      data={data?.userFavouriteProducts}
      fetching={fetching}
      error={error}
      skeletonLen={favouriteAmount}
      refetch={refetch}
    />
  )
}
