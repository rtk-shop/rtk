import { SvgIcon } from '@/components/ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import useTranslation from 'next-translate/useTranslation'
import CrossIcon from '../../../../../public/icons/cross.svg'

interface CartHeadProps {
  onCartClose(): void
}

export function CartHead({ onCartClose }: CartHeadProps) {
  const { t } = useTranslation('common')

  return (
    <div className="sticky top-0 z-50 bg-gray-light p-2.5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-black lg:text-lg">{t('cart.topControls.title')}</p>
        <IconButton disableRipple onClick={onCartClose} className="fill-gray-500 text-base">
          <SvgIcon>
            <CrossIcon />
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  )
}
