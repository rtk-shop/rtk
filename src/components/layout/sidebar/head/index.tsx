import Image from 'next/image'
import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import CrossIcon from '../../../../../public/icons/cross.svg'

export function SidebarHead({ onClose }: { onClose(): void }) {
  return (
    <div className="relative h-52 md:h-60">
      <div className="ml-4 mt-4 w-28 select-none md:w-36">
        <Image priority={true} width={150} height={40} src="/assets/logo.svg" alt="логотип" />
      </div>

      <div className="absolute right-4 top-4">
        <IconButton
          disableRipple
          onClick={onClose}
          className="fill-white text-sm hover:fill-gray-300"
        >
          <SvgIcon>
            <CrossIcon />
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  )
}
