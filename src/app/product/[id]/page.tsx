import { Box } from '@/components/ui/box'
import { Preview } from './preview'
import { InstockBadge } from '@/components/product/instock-badge'
import { Sizes } from './sizes'
import { Info } from './info'
import { AddToCartButton } from './controls/add-to-cart'
import { SubControls } from './controls/sub-controls'
import { TagBadge } from '@/components/product/tag-badge'
import { Delivery } from './delivery'
import { ProductPrice } from './price'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { Description } from './info/description'
import { Properties } from './info/properties'
import { TelegramAppWidgets } from './telegram'

import 'keen-slider/keen-slider.min.css'

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const { error, data } = await getProduct(id)

  if (error) throw new Error(error.message)
  if (!data) throw new Error('unexpected error [no data, no error]')

  const product = data.product

  if (product.__typename === 'NotFound') notFound()

  return (
    <>
      <style precedence="high">
        {`
          body {
            background-color: var(--color-gray-200);
          }
        `}
      </style>
      <Box className="mb-4">
        <Preview
          images={product.images}
          tag={
            product.tag && (
              <TagBadge
                tag={product.tag}
                currentPrice={product.currentPrice}
                basePrice={product.basePrice}
              />
            )
          }
        />
        <Box className="px-2">
          <Box className="mb-5 rounded-2xl bg-white px-3 pt-5 pb-4">
            <Box as="section">
              <h1 className="mb-3.5 text-[21px] leading-5 font-medium">{product.title}</h1>
              <Box flex="row" align="center" justify="between" className="mb-2.5 pr-2.5">
                <InstockBadge inStock={product.inStock} />
                <ProductPrice currentPrice={product.currentPrice} basePrice={product.basePrice} />
              </Box>
            </Box>
            <Sizes
              category={product.category}
              sizeName={product.sizeName}
              availableSizes={product.availableSizes}
            />
            <AddToCartButton productId={product.id} inStock={product.inStock} />
            <SubControls productId={product.id} />
          </Box>
          <Box className="rounded-2xl bg-white px-2 pt-6 pb-1">
            <Info
              description={<Description textMarkdown={product.details.description as string} />}
              properties={
                <Properties
                  category={product.category}
                  gender={product.gender}
                  weight={product.details.weight}
                  dimensions={product.details.dimensions}
                  capacity={product.details.capacity}
                  color={product.colorName}
                />
              }
            />
            <Delivery inStock={product.inStock} category={product.category} />
          </Box>
        </Box>
        <TelegramAppWidgets />
      </Box>
    </>
  )
}
