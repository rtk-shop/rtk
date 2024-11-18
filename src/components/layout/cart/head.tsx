import { SvgIcon } from '@/components/ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import { useCartStore } from '@/providers/cart-store-provider'
import { useTranslations } from 'next-intl'
import ExpandArrowIcon from '../../../../public/icons/expand-arrow.svg'

export function CartHead({ onCartClose }: { onCartClose(): void }) {
  const t = useTranslations('Common')
  const [cartAmount] = useCartStore((state) => state.cartAmount())
  const [clear] = useCartStore((state) => state.clear)

  return (
    <div className="sticky top-0 z-50 bg-gray-50 py-4 pl-2.5 pr-3">
      <div className="flex items-center justify-between">
        <IconButton
          disableRipple
          onClick={onCartClose}
          className="-rotate-90 fill-gray-700 !p-0 text-[33px]"
        >
          <SvgIcon>
            <ExpandArrowIcon />
          </SvgIcon>
        </IconButton>
        <p className="ml-8 text-xl font-medium text-black">{t('cart.topControls.title')}</p>
        <button onClick={clear} className="text-[13px] font-medium text-red-500">
          {t('verbs.clear')} ({cartAmount})
        </button>
      </div>
    </div>
  )
}
