import { cva } from 'cva'
import { Preview } from './preview'
import { Details } from './details'
import { Info } from './info'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { formatPrice } from '@/lib/helpers'

import 'keen-slider/keen-slider.min.css'

const priceTitle = cva('text-[27px] font-medium', {
  variants: {
    withDiscount: {
      true: 'mx-1.5 text-red-600',
      false: 'text-black'
    }
  }
})

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const resp = await getProduct(id)

  if (resp?.product.__typename === 'NotFound') {
    return notFound()
  }

  if (!(resp?.product.__typename === 'Product')) {
    return notFound()
  }

  const product = resp?.product

  const withDiscount = product.basePrice !== product.currentPrice
  // className="mb-[69px]"
  return (
    <div
    // style={{
    //   paddingBottom: 'var(--tg-safe-area-inset-bottom)'
    // }}
    >
      {/*  */}
      <Preview
        images={product.images}
        currentPrice={product.currentPrice}
        basePrice={product.basePrice}
      />
      {/*  */}
      <section className="px-1.5">
        <h1 className="mt-4 mb-1.5 text-xl leading-5 font-medium">{product.title}</h1>
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
