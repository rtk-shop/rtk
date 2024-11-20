import { IconButton } from '@/components/ui/icon-button'
import { LogoImage } from '@/components/ui/logo'
import { Icon } from '@/components/ui/icon'

export function SidebarHead({ onClose }: { onClose(): void }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="w-14 fill-white">
        <LogoImage />
      </div>
      <IconButton
        disableRipple
        onClick={onClose}
        className="text-sm text-white hover:text-gray-300"
      >
        <Icon name="common/xmark" />
      </IconButton>
    </div>
  )
}
