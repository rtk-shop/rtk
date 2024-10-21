import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { formatPrice } from '@/lib/helpers'
import { useCartPrice } from '@/apollo/cache/cart'
import useTranslation from 'next-translate/useTranslation'

interface SummaryProps {
  currency: number
  loading: boolean
  onCheckout(): void
}

export function Summary({ loading, currency, onCheckout }: SummaryProps) {
  const { t } = useTranslation('common')
  const cartPrice = useCartPrice()

  const handleButtonClick = (): void => {
    onCheckout()
  }

  if (loading) return <Skeleton />

  return (
    <div className="bg-gray-50 px-4 pb-5 pt-4 md:bg-gray-light">
      <p className="mb-2 flex justify-between text-lg font-semibold">
        <span>{t('cart.total')}:</span>
        <span>
          <span>{formatPrice(cartPrice)}$&nbsp;</span>
          <span className="text-gray-500">• {formatPrice(cartPrice * currency)}₴</span>
        </span>
      </p>
      <Button color="accept" fullWidth onClick={handleButtonClick}>
        {t('cart.makeOrder')}
      </Button>
    </div>
  )
}
