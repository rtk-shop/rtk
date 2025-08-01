import { IconButton } from '@/components/ui/icon-button'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/stores/app/store'
import { useClearCartMutation } from '@/lib/api/hooks'

export function CartHead({ quantity }: { quantity: number }) {
  const t = useTranslations('Common')
  const closeCart = useAppState((state) => state.closeCart)

  const [_, clearCart] = useClearCartMutation()

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
    <div className="sticky top-0 z-50 py-3 pr-3 pl-2.5">
      <div className="flex items-center justify-between">
        <IconButton onClick={closeCart} className="-rotate-90 fill-gray-700 p-0! text-[35px]">
          <Icon name="common/arrow" />
        </IconButton>
        <p className="ml-8 text-xl font-medium text-black">{t('cart.topControls.title')}</p>
        <button
          type="button"
          onClick={handleClearClick}
          className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-medium text-red-500"
        >
          {t('verbs.clear')}
          <span className="ml-0.5">({quantity})</span>
        </button>
      </div>
    </div>
  )
}
