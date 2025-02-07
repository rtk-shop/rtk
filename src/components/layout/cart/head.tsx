import { IconButton } from '@/components/ui/icon-button'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/ui/icon'
import { useClearCartMutation } from '@/lib/api/hooks'
import { toast } from 'sonner'
import { Loader } from '@/components/ui/loader'

export function CartHead({ quantity, onCartClose }: { quantity: number; onCartClose(): void }) {
  const t = useTranslations('Common')

  const [clearMeta, clearCart] = useClearCartMutation()

  const handleClearClick = () => {
    clearCart().then((result) => {
      if (result.error) {
        toast.error('Не удалось очистить корзину', {
          duration: 2000,
          richColors: true
        })
        return
      }
    })
  }

  return (
    <div className="sticky top-0 z-50 bg-gray-50 py-4 pr-3 pl-2.5">
      <div className="flex items-center justify-between">
        <IconButton
          disableRipple
          onClick={onCartClose}
          className="-rotate-90 fill-gray-700 p-0! text-[33px]"
        >
          <Icon name="common/arrow" />
        </IconButton>
        <p className="ml-8 text-xl font-medium text-black">{t('cart.topControls.title')}</p>
        {clearMeta.fetching ? (
          <Loader color="dark" />
        ) : (
          <button
            type="button"
            onClick={handleClearClick}
            className="text-[13px] font-medium text-red-500"
          >
            {t('verbs.clear')} ({quantity})
          </button>
        )}
      </div>
    </div>
  )
}
