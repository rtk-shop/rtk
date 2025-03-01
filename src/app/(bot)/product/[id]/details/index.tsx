import { cva } from 'cva'
import { SizeGuide } from '@/components/ui/size-guide'
import { Controls } from './controls'
import { formatPrice } from '@/lib/helpers'
import { AddToCartButton } from './add-to-cart'

interface DetailsProps {
  id: string
  sku: string
  title: string
  currentPrice: number
  tags?: string[]
  basePrice: number
  inStock: boolean
}

const priceTitle = cva('text-[23px] font-medium', {
  variants: {
    withDiscount: {
      true: 'mx-1.5 text-red-600',
      false: 'text-black'
    }
  }
})

export function Details({ id, sku, title, currentPrice, tags, inStock, basePrice }: DetailsProps) {
  const withDiscount = basePrice !== currentPrice

  return (
    <section className="px-1.5">
      {/*  */}
      <h1 className="mt-4 mb-1.5 text-xl leading-5 font-medium">{title}</h1>
      {/*  */}
      <div className="mb-3 flex items-center">
        {withDiscount && (
          <span className="text-lg text-gray-500 line-through">{formatPrice(basePrice)}</span>
        )}
        {/*  */}
        <p className={priceTitle({ withDiscount })}>{formatPrice(currentPrice)} грн</p>
        {/*  */}
        {withDiscount && (
          <span className="bg-green-light w-12 px-1 text-center text-[13px] font-medium text-white">
            -{Math.round(((basePrice - currentPrice) * 100) / basePrice)}%
          </span>
        )}
      </div>
      {/*  */}
      <p className="mb-2 font-medium">Выберите размер:</p>
      <SizeGuide current="L" available={['M', '2XL', 'L']} />
      {/*  */}
      <AddToCartButton productID={id} inStock={inStock} />
      {/*  */}
      <Controls productId={id} />
    </section>
  )
}
