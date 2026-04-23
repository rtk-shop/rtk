import { Box } from '@/components/ui/box'

export function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <Box flex="row" align="center" className="mb-4 border-b-2 border-b-gray-100 pb-1.5">
      {icon && <Box className="mr-2 text-gray-500">{icon}</Box>}
      <h2 className="leading-none font-medium tracking-tight">{title}</h2>
    </Box>
  )
}
