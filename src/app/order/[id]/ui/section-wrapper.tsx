import { Box } from '@/components/ui/box'

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box as="section" className="mb-3 rounded-xl bg-white p-4 shadow-md">
      {children}
    </Box>
  )
}
