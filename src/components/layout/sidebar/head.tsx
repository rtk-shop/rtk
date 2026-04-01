import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { Button } from '@/components/ui/button'

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
      <Button color="ghost" size="sm" onClick={onClose} className="bg-transparent">
        <Icon name="common/x" className="text-2xl text-white" />
      </Button>
    </Box>
  )
}
