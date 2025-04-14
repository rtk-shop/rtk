import { Button } from '@repo/ui'
import { ProductItem } from '@/components/product-item'
import type { ProductTag } from '@/types'

export interface ProductsProps {
  products: Array<{
    id: string
    title: string
    inStock: boolean
    currentPrice: number
    basePrice: number
    tag?: keyof typeof ProductTag | null
    preview: string
  }>
  onReset(): void
}

export function ProductList({ products, onReset }: ProductsProps) {
  if (!products.length) {
    return (
      <div className="flex h-screen justify-center">
        <div className="mt-60 text-center">
          <p className="mb-5 max-w-60 text-lg font-medium">
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
        {products.map((product) => (
          <li key={product.id} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
            <ProductItem
              id={product.id}
              preview={product.preview}
              title={product.title}
              currentPrice={product.currentPrice}
              inStock={product.inStock}
              tag={product.tag}
              basePrice={product.basePrice}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
