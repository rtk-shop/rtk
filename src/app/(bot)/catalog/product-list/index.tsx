import { cva } from 'cva'
import { Button } from '@/components/ui/button'
import { ProductItem } from '@/components/product-item'
import { Pagination } from '@/components/ui/pagination'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import type { ProductTag } from '@/types'

interface ProductsProps {
  totalPages: number
  currentPage: number
  products:
    | Array<{
        id: string
        title: string
        inStock: boolean
        currentPrice: number
        basePrice: number
        tag?: keyof typeof ProductTag | null
        preview: string
      }>
    | undefined
  onReset(): void
}

const pagination = cva('py-4', {
  variants: {
    visible: {
      true: 'visible',
      false: 'invisible'
    }
  }
})

export function ProductList({ totalPages, currentPage, products, onReset }: ProductsProps) {
  const [favoriteItems] = useFavoriteStore((state) => state.products)

  const handlePagination = (page: number) => {
    console.log(`go page ${page}`)
  }

  if (products === undefined) return null

  if (!products.length) {
    return (
      <div className="flex h-screen justify-center">
        <div className="mt-60 text-center">
          <p className="text-[39px] font-medium">:(</p>
          <p className="mb-5 max-w-64 font-medium">
            Извините, но по вашему запросу ничего не найдено
          </p>
          <Button color="primary" onClick={onReset} fullWidth>
            Смотреть все
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:px-2.5">
      <ul className="flex flex-wrap">
        {products.map((product) => {
          const isFavorite = favoriteItems.includes(product.id)

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
                isFavorite={isFavorite}
              />
            </li>
          )
        })}
      </ul>
      <div className={pagination({ visible: totalPages > 1 })}>
        <Pagination total={totalPages} currentPage={currentPage} onChange={handlePagination} />
      </div>
    </div>
  )
}
