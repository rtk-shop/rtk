import { Box } from '@/components/ui/box'
import { cva } from 'cva'
import { Preview } from './preview'
import { InstockBadge } from '@/components/product/instock-badge'
import { Sizes } from './sizes'
import { Info } from './info'
import { AddToCartButton } from './controls/add-to-cart'
import { SubControls } from './controls/sub-controls'
import { TagBadge } from '@/components/product/tag-badge'
import { Delivery } from './delivery'
import { FormatPrice } from '@/components/ui/format-price'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { Description } from './info/description'
import { Properties } from './info/properties'
import { TelegramAppWidgets } from './telegram'

import 'keen-slider/keen-slider.min.css'

const priceTitle = cva('text-2xl', {
  variants: {
    withDiscount: {
      true: 'leading-none text-red-600',
      false: 'text-black'
    }
  }
})

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const { error, data } = await getProduct(id)

  if (error) throw new Error(error.message)
  if (!data) throw new Error('unexpected error [no data, no error]')

  const product = data.product

  if (product.__typename === 'NotFound') notFound()

  const withDiscount = product.basePrice > product.currentPrice

  return (
    <Box>
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
      <Box className="px-1.5">
        <Box as="section">
          <h1 className="mt-4 mb-2.5 text-[21px] leading-5 font-medium">{product.title}</h1>
          <Box flex="row" align="center" justify="between" className="mb-2.5 pr-2.5">
            <InstockBadge inStock={product.inStock} />
            <Box>
              {withDiscount && (
                <Box className="text-end leading-none text-gray-500 line-through">
                  <FormatPrice price={product.basePrice} />
                </Box>
              )}
              <Box className={priceTitle({ withDiscount })}>
                <FormatPrice size="inherit" price={product.currentPrice} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Sizes
          category={product.category}
          sizeName={product.sizeName}
          availableSizes={product.availableSizes}
        />
        <AddToCartButton productId={product.id} inStock={product.inStock} />
        <SubControls productId={product.id} />
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
      <TelegramAppWidgets />
    </Box>
  )
}
