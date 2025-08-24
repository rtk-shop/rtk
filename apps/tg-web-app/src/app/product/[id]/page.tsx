import { cva } from 'cva'
import { Preview } from './preview'
import { InstockBadge } from '@/components/product/instock-badge'
import { Sizes } from './sizes'
import { Info } from './info'
import { AddToCartButton } from './controls/add-to-cart'
import { SubControls } from './controls/sub-controls'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { formatPrice } from '@repo/utils'

import 'keen-slider/keen-slider.min.css'

const priceTitle = cva('text-[30px] font-medium', {
  variants: {
    withDiscount: {
      true: 'mx-1.5 text-red-600',
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

  const withDiscount = product.basePrice !== product.currentPrice

  return (
    <div>
      <Preview
        images={product.images}
        currentPrice={product.currentPrice}
        basePrice={product.basePrice}
      />
      <div className="px-1.5">
        <section>
          {/*  */}
          <h1 className="mt-4 mb-1.5 text-[21px] leading-5 font-medium">{product.title}</h1>
          <InstockBadge inStock={product.inStock} />
          {/*  */}
          <div className="flex items-center">
            {withDiscount && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.basePrice)}
              </span>
            )}
            <p className={priceTitle({ withDiscount })}>{formatPrice(product.currentPrice)} грн</p>
          </div>
        </section>
        <Sizes
          category={product.category}
          sizeName={product.sizeName}
          availableSizes={product.availableSizes}
        />
        <AddToCartButton productId={product.id} inStock={product.inStock} />
        <SubControls productId={product.id} />
        <Info
          gender={product.gender}
          description={product.description as string}
          dimensions={'11x11x11'}
          color={product.colorName}
          category={product.category}
        />
      </div>
    </div>
  )
}
