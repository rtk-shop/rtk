import { Box } from '@/components/ui/box'
import { cva } from 'cva'

const widgetContainer = cva('rounded-lg bg-slate-100 px-2 py-1.5')

export function Widget({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Box className={widgetContainer({ className })}>
      <Box flex="col" className="h-full">
        <p className="mb-2 text-sm font-medium tracking-tighter">{title}</p>
        <Box className="min-h-0 flex-1">{children}</Box>
      </Box>
    </Box>
  )
}
