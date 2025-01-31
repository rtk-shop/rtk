'use client'

import { ProductSkeleton } from '@/components/product-item/skeleton'
import { Icon } from '@/components/ui/icon'
import { ProductItem } from '@/components/product-item'
import { useFavoriteProductsQuery } from '@/lib/api/hooks'

function ListSkeleton({ count = 6 }: { count?: number }) {
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

export default function Favourites() {
  const [result] = useFavoriteProductsQuery()

  const { data, fetching, error } = result

  if (fetching) {
    return (
      <div className="">
        <ListSkeleton count={8} />
      </div>
    )
  }

  if (data?.userFavouriteProducts.length === 0) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="common/emptycart" className="mb-3 text-[230px]" />
          <p className="text-lg">Список закакоз пуст</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full pb-3">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-slate-100 text-gray-500">
          <Icon name="action/warning" className="mb-1 text-[39px]" />
          <p className="text-lg">Ошибка получения данных</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:px-2.5">
      <ul className="flex flex-wrap">
        {data?.userFavouriteProducts.map((product) => {
          return (
            <li key={product.id} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
              <ProductItem
                id={product.id}
                url={product.preview}
                title={product.title}
                price={product.currentPrice}
                inStock={product.inStock}
                tag={product.tag}
                basePrice={product.basePrice}
                isFavorite={true}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
