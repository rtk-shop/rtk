import { Box } from '@/components/ui/box'

export function WidgetGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box className="grid grid-cols-[repeat(12,minmax(0,100px))] grid-rows-[repeat(2,33px)] gap-3">
      {children}
    </Box>
  )
}
