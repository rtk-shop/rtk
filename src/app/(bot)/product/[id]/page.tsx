import { cva } from 'cva'
import { Preview } from './preview'
import { Details } from './details'
import { Info } from './info'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { formatPrice } from '@/lib/helpers'

import 'keen-slider/keen-slider.min.css'

const priceTitle = cva('text-[23px] font-medium', {
  variants: {
    withDiscount: {
      true: 'mx-1.5 text-red-600',
      false: 'text-black'
    }
  }
})

export default async function Product({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const id = (await params).id
  const { size } = await searchParams

  const sizeParam = Array.isArray(size) ? undefined : size

  const resp = await getProduct(id, sizeParam)

  console.log(searchParams)

  if (resp?.product.__typename === 'NotFound') {
    return notFound()
  }

  if (!(resp?.product.__typename === 'Product')) {
    return notFound()
  }

  const product = resp?.product

  const withDiscount = product.basePrice !== product.currentPrice

  return (
    <div className="mb-[69px]">
      {/*  */}
      <Preview images={product.images} />
      {/*  */}
      <section className="px-1.5">
        <h1 className="mt-4 mb-1.5 text-xl leading-5 font-medium">{product.title}</h1>
        <div className="mb-3 flex items-center">
          {withDiscount && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.basePrice)}
            </span>
          )}
          <p className={priceTitle({ withDiscount })}>{formatPrice(product.currentPrice)} грн</p>
          {withDiscount && (
            <span className="bg-green-light w-12 px-1 text-center text-[13px] font-medium text-white">
              -{Math.round(((product.basePrice - product.currentPrice) * 100) / product.basePrice)}%
            </span>
          )}
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
        description={(product.description as string) || ''}
        dimensions={'11x11x11'}
        color={product.colorName}
        category={product.category}
      />
    </div>
  )
}
