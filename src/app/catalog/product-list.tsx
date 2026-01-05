import { Box } from '@/components/ui/box'
import { ProductItem } from '@/components/product/item'
import { ProductTag } from '@/lib/api/graphql/types'
import { NoDataPlug } from './plugs/no-data'

export interface ProductsProps {
  products: Array<{
    id: string
    title: string
    inStock: boolean
    currentPrice: number
    basePrice: number
    tag?: ProductTag | null
    preview: string
  }>
  onReset(): void
}

export function ProductList({ products, onReset }: ProductsProps) {
  if (!products.length) return <NoDataPlug onActionClick={onReset} />

  return (
    <Box className="lg:px-2.5">
      <Box as="ul" flex="row">
        {products.map((product) => (
          <Box as="li" key={product.id} className="basis-6/12 md:basis-4/12 xl:basis-3/12">
            <ProductItem
              id={product.id}
              preview={product.preview}
              title={product.title}
              currentPrice={product.currentPrice}
              inStock={product.inStock}
              tag={product.tag}
              basePrice={product.basePrice}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
