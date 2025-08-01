import { Button } from '@repo/ui'
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

  if (loading) return <Skeleton />

  const handleButtonClick = (): void => {
    closeCart()
    router.push(routeNames.checkout)
  }

  return (
    <div className="bg-gray-50 px-4 pt-4 pb-5">
      <p className="mb-2 flex justify-between text-lg font-semibold">
        <span>{t('total')}:</span>
        <span>
          <FormatPrice price={totalSum} />
        </span>
      </p>
      <Button fullWidth onClick={handleButtonClick}>
        {t('makeOrder')}
      </Button>
    </div>
  )
}
