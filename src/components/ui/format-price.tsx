import { formatPrice } from '@/lib/helpers'
import { cva, type VariantProps } from 'cva'

const priceView = cva('leading-none font-medium tracking-tight', {
  variants: {
    size: {
      normal: 'text-base',
      XL: 'text-lg',
      XXL: 'text-xl',
      XL2: 'text-2xl',
      inherit: ''
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export interface FormatPriceProps {
  price: number
  currency?: string
}

export function FormatPrice({
  price,
  size,
  currency = '₴'
}: VariantProps<typeof priceView> & FormatPriceProps) {
  return (
    <span className={priceView({ size })}>
      {formatPrice(price)}
      <span style={{ marginLeft: 3 }}>{currency}</span>
    </span>
  )
}
