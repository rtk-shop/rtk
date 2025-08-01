import { Button } from '@repo/ui'
import { Icon } from '@/components/ui/icon'
import { useAppState } from '@/stores/app/store'
import { useTranslations } from 'next-intl'

export function ErrorCartPlug() {
  const t = useTranslations('Common.cart')

  const closeCart = useAppState((state) => state.closeCart)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Icon name="action/warning" className="text-[130px]" />
      <p className="mt-2.5 max-w-2/3 text-center text-xl font-medium">{t('error.text')}</p>
      <Button
        onClick={closeCart}
        fullWidth
        className="mt-12 max-w-60 py-3"
        startIcon={<Icon name="common/arrow" className="-rotate-90 text-[23px]" />}
      >
        {t('error.action')}
      </Button>
    </div>
  )
}
