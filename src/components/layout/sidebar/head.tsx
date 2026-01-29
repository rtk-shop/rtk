import { Box } from '@/components/ui/box'
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
    <Box flex="row" align="center" justify="between" className="px-4 py-2 pt-8 text-white">
      <Box onClick={handleLogoClick}>
        <Icon name="common/logo" className="text-[48px]" />
      </Box>
      <IconButton onClick={onClose} className="text-sm">
        <Icon name="common/xmark" />
      </IconButton>
    </Box>
  )
}
