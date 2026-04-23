import { formatPrice } from '@/lib/helpers'
import { cva, type VariantProps } from 'cva'

const priceView = cva('leading-none tracking-tight', {
  variants: {
    size: {
      sm: 'text-sm',
      normal: 'text-base',
      XL: 'text-lg',
      XXL: 'text-xl',
      XL2: 'text-2xl',
      controlled: ''
    },
    weight: {
      normal: '',
      bold: 'font-medium'
    }
  },
  defaultVariants: {
    weight: 'bold'
  }
})

export interface FormatPriceProps {
  price: number
  currency?: string
}

export function FormatPrice({
  price,
  weight,
  size = 'normal',
  currency = '₴'
}: VariantProps<typeof priceView> & FormatPriceProps) {
  return (
    <span className={priceView({ size, weight })}>
      {formatPrice(price)}
      <span style={{ marginLeft: 4 }} className={size === 'controlled' ? 'text-[0.75em]' : ''}>
        {currency}
      </span>
    </span>
  )
}
