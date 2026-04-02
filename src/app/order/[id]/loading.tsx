import { Box } from '@/components/ui/box'
import { Loader } from '@/components/ui/loader'

export default function Loading() {
  return (
    <Box flex="row" align="center" justify="center" className="h-dvh">
      <Box className="animate-in fade-in zoom-in">
        <Loader size="lg" />
      </Box>
    </Box>
  )
}
