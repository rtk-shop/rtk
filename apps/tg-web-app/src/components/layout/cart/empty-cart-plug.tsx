import { Button } from '@repo/ui'
import { Icon } from '@/components/ui/icon'
import { useAppState } from '@/stores/app/store'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'

export function EmptyCartPlug() {
  const t = useTranslations('Common.cart')
  const router = useRouter()
  const closeCart = useAppState((state) => state.closeCart)

  const handleActionButtonClick = () => {
    closeCart()
    router.push(routeNames.catalog)
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="px-4">
        <Icon name="common/emptycart" className="text-[300px] text-gray-500" />
        <p className="mt-2.5 text-center text-2xl font-medium">{t('empty.text')}</p>
      </div>
      <Button onClick={handleActionButtonClick} fullWidth className="mt-12 max-w-62 py-3">
        {t('empty.action')}
      </Button>
      <div className="absolute top-5 right-4">
        <Button
          onClick={closeCart}
          color="secondary"
          className="flex items-center rounded-md bg-slate-100 !py-1 !pr-3 !pl-2 text-sm leading-4 text-gray-700"
          startIcon={<Icon name="common/arrow" className="-rotate-90 text-[23px]" />}
        >
          Назад
        </Button>
      </div>
    </div>
  )
}
