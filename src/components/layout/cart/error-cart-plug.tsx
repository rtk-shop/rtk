import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useAppState } from '@/stores/app/store'
import { useTranslations } from 'next-intl'

export function ErrorCartPlug() {
  const t = useTranslations('Common.cart')

  const closeCart = useAppState((state) => state.closeCart)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Icon name="action/warning" className="text-[130px] text-red-400" />
      <p className="mt-2.5 text-center text-xl font-medium tracking-tight">{t('error.text')}</p>
      <Button fullWidth onClick={closeCart} rounded="xl" className="mt-12 max-w-60">
        <Icon name="common/arrow" className="-rotate-90 text-[23px]" />
        {t('error.action')}
      </Button>
    </div>
  )
}
