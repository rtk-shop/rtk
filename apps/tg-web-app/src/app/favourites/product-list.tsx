'use client'

import { useFavoriteProductsQuery } from '@/lib/api/hooks'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { ProductList } from '@/components/product/list'

export function Products() {
  const [favouriteAmount] = useFavoriteStore((state) => state.amount)
  const [result] = useFavoriteProductsQuery()

  const { data, fetching, error } = result

  return (
    <>
      <style precedence="high">
        {`
          main {
            height: ${!!data?.userFavouriteProducts.length ? 'auto' : '100dvh'};
          }
        `}
      </style>
      <ProductList
        data={data?.userFavouriteProducts}
        fetching={fetching}
        error={error}
        skeletonLen={favouriteAmount}
        noDataMsg={'Список обраного порожній'}
        errMsg={'В нас щось сталось, вже працюємо над цим!'}
      />
    </>
  )
}
