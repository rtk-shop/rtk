import { Box } from '@/components/ui/box'
import { cva } from 'cva'
import { FormatPrice } from '@/components/ui/format-price'

const priceTitle = cva('', {
  variants: {
    hasDiscount: {
      true: 'text-red-600',
      false: 'text-black'
    }
  }
})

export function ProductPrice({
  currentPrice,
  basePrice
}: {
  currentPrice: number
  basePrice: number
}) {
  const hasDiscount = currentPrice < basePrice

  return (
    <Box>
      {hasDiscount && (
        <p className="text-end leading-none text-gray-400 line-through">
          <FormatPrice price={basePrice} />
        </p>
      )}
      <Box className={priceTitle({ hasDiscount })}>
        <FormatPrice size="XL2" price={currentPrice} />
      </Box>
    </Box>
  )
}
