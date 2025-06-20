import { cva } from 'cva'
import { Icon } from '@/components/ui/icon'
import { Preview } from './preview'
import { Details } from './details'
import { Info } from './info'
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

const instockBadge = cva(
  'mr-1 flex content-center items-center justify-center rounded-full p-1 text-sm leading-none font-semibold text-white select-none',
  {
    variants: {
      instock: {
        true: 'bg-green-light',
        false: 'size-5 bg-gray-300'
      }
    }
  }
)

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
      <section className="px-1.5">
        {/*  */}
        <h1 className="mt-4 mb-1.5 text-[21px] leading-5 font-medium">{product.title}</h1>
        {/*  */}
        <div className="flex items-center pt-2 pb-0.5">
          <div className={instockBadge({ instock: product.inStock })}>
            {product.inStock && <Icon name="common/check" className="text-xs" />}
          </div>
          <span className="text-sm leading-none font-medium text-gray-700">
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
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
      <Details
        productId={product.id}
        inStock={product.inStock}
        category={product.category}
        sizeName={product.sizeName}
        availableSizes={product.availableSizes}
      />
      <Info
        gender={product.gender}
        description={product.description as string}
        dimensions={'11x11x11'}
        color={product.colorName}
        category={product.category}
      />
    </div>
  )
}
