import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useAppState } from '@/stores/app/store'
import { routeNames } from '@/lib/routes'
import { FormatPrice } from '@/components/ui/format-price'

export function Summary({
  loading,
  totalSum = 0
}: {
  loading: boolean
  totalSum: number | undefined
}) {
  const router = useRouter()
  const t = useTranslations('Common.cart')
  const closeCart = useAppState((state) => state.closeCart)

  const handleButtonClick = () => {
    closeCart()
    router.push(routeNames.checkout)
  }

  if (loading) return <Skeleton />

  return (
    <div className="bg-gray-50 px-4 pt-4 pb-5">
      <p className="mb-2 flex justify-between text-lg font-semibold">
        <span>{t('total')}:</span>
        <span>
          <FormatPrice size="XL" price={totalSum} currency="грн" />
        </span>
      </p>
      <Button fullWidth onClick={handleButtonClick}>
        {t('makeOrder')}
      </Button>
    </div>
  )
}
