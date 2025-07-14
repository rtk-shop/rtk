import { formatPrice } from '@repo/utils'

export function FormatPrice({
  price,
  currency = '₴',
  ...props
}: {
  price: number
  currency?: string
  className?: string
}) {
  const num = formatPrice(price)

  return (
    <span>
      <span {...props}>{num}</span> {currency}
    </span>
  )
}
