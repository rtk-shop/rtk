import { SvgIcon } from '@/components/ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import XmarkIcon from '../../../../../public/icons/xmark.svg'

interface CartHeadProps {
  headText: string
  onCartClose(): void
}

export function CartHead({ headText, onCartClose }: CartHeadProps) {
  return (
    <div className="sticky top-0 z-50 bg-gray-light p-2.5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-black lg:text-lg">{headText}</p>
        <IconButton disableRipple onClick={onCartClose} className="fill-gray-500 text-base">
          <SvgIcon>
            <XmarkIcon />
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  )
}
