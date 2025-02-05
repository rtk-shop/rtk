import { IconButton } from '@/components/ui/icon-button'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/ui/icon'
import { useClearCartMutation } from '@/lib/api/hooks'
import { toast } from 'sonner'

export function CartHead({ onCartClose }: { onCartClose(): void }) {
  const t = useTranslations('Common')

  const [_, clearCart] = useClearCartMutation()

  const cartAmount = 11

  const handleClearClick = () => {
    clearCart().then((result) => {
      if (result.error) {
        toast.error('Не удалось очистить корзину')
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
        <button onClick={handleClearClick} className="text-[13px] font-medium text-red-500">
          {t('verbs.clear')} ({cartAmount})
        </button>
      </div>
    </div>
  )
}
