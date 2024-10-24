import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import XmarkIcon from '../../../../public/icons/xmark.svg'
import { LogoImage } from '@/components/ui/logo'

export function SidebarHead({ onClose }: { onClose(): void }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="w-14 fill-white">
        <LogoImage />
      </div>
      <IconButton
        disableRipple
        onClick={onClose}
        className="fill-white text-sm hover:fill-gray-300"
      >
        <SvgIcon>
          <XmarkIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
