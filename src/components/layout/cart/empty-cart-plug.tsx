import { Button } from '@/components/ui/button'
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
        <p className="mt-2.5 text-center text-2xl font-medium tracking-tight">{t('empty.text')}</p>
      </div>
      <Button
        rounded="xl"
        size="lg"
        onClick={handleActionButtonClick}
        fullWidth
        className="mt-10 max-w-62"
      >
        <Icon name="common/arrow" className="-rotate-90 text-[23px]" />
        {t('empty.action')}
      </Button>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <Button color="ghost" size="sm" onClick={closeCart}>
          {t('empty.close')}
        </Button>
      </div>
    </div>
  )
}
