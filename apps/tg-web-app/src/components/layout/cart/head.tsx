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
        <div className="ml-8 flex items-center">
          <Icon name="common/cart" className="stroke-black text-[22px]" />
          <div className="ml-0.5 self-end">
            <p className="text-xl leading-none font-medium">{t('cart.topControls.title')}</p>
          </div>
        </div>
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
