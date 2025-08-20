import { formatPrice } from '@repo/utils'
import { cva } from 'cva'

const priceView = cva('font-medium', {
  variants: {
    size: {
      normal: 'text-base',
      XL: 'text-lg',
      XXL: 'text-xl'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export function FormatPrice({
  price,
  size,
  currency = '₴'
}: {
  price: number
  currency?: string
  size?: 'normal' | 'XL' | 'XXL'
}) {
  return (
    <span className={priceView({ size })}>
      {formatPrice(price)}
      <span style={{ marginLeft: 3 }}>{currency}</span>
    </span>
  )
}
