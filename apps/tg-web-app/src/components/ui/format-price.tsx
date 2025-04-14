import { formatPrice } from '@repo/utils'

export function FormatPrice({ price, currency = '₴' }: { price: number; currency?: string }) {
  const num = formatPrice(price)

  return (
    <span>
      <span className="font-medium">{num}</span> {currency}
    </span>
  )
}
