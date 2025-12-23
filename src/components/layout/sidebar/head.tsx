import { IconButton } from '@/components/ui/icon-button'
import { Icon } from '@/components/ui/icon'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'

export function SidebarHead({ onClose }: { onClose(): void }) {
  const router = useRouter()

  const handleLogoClick = () => {
    if (process.env.NODE_ENV === 'development') {
      router.push('/sandbox')
    } else {
      router.push(routeNames.catalog)
    }
    onClose()
  }

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="w-14 text-[47px] text-white" onClick={handleLogoClick}>
        <Icon name="common/logo" />
      </div>
      <IconButton onClick={onClose} className="text-sm text-white hover:text-gray-300">
        <Icon name="common/xmark" />
      </IconButton>
    </div>
  )
}
