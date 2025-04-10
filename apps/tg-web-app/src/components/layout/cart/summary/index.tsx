import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { FormatPrice } from '@/components/ui/format-price'
import { useTranslations } from 'next-intl'

interface SummaryProps {
  loading: boolean
  totalSum: number | undefined
  onCheckout(): void
}

export function Summary({ loading, totalSum = 0, onCheckout }: SummaryProps) {
  const t = useTranslations('Common')

  if (loading) return <Skeleton />

  const handleButtonClick = (): void => {
    onCheckout()
  }

  return (
    <div className="bg-gray-50 px-4 pt-4 pb-5">
      <p className="mb-2 flex justify-between text-lg font-semibold">
        <span>{t('cart.total')}:</span>
        <span>
          <FormatPrice price={totalSum} />
        </span>
      </p>
      <Button color="accept" fullWidth onClick={handleButtonClick}>
        {t('cart.makeOrder')}
      </Button>
    </div>
  )
}
