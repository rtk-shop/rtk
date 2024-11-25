import { IconButton } from '@/components/ui/icon-button'
import { Icon } from '@/components/ui/icon'

export function SidebarHead({ onClose }: { onClose(): void }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="w-14 text-[47px] text-white">
        <Icon name="common/logo" />
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
