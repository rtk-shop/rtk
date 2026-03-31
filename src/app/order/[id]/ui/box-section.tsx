import { Box } from '@/components/ui/box'

export function BoxSection({
  title,
  icon,
  children
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Box as="section" className="mb-2 rounded-lg bg-white px-3 py-2.5 shadow-sm">
      <Box flex="row" align="center" className="mb-0.5">
        {icon}
        <h2 className="pt-0.5 text-lg font-medium tracking-tight">{title}</h2>
      </Box>
      {children}
    </Box>
  )
}
