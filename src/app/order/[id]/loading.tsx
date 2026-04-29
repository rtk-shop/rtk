import { Box } from '@/components/ui/box'
import ContentLoader from 'react-content-loader'

export default function Loading() {
  const round = 10

  return (
    <Box className="bg-gray-100 px-2">
      <ContentLoader
        className=""
        backgroundColor="#e5e7eb"
        foregroundColor="#f9fafb"
        width="100%"
        viewBox="0 0 600 1200"
      >
        <rect x="24%" y="25" rx={2} ry={2} width="300" height="33" />
        <rect x="30%" y="70" rx={2} ry={2} width="220" height="25" />

        <rect x="0" y="120" rx={round} ry={round} width="100%" height="72" />
        <rect x="0" y="210" rx={round} ry={round} width="60%" height="150" />
        <rect x="61%" y="210" rx={round} ry={round} width="39%" height="150" />

        <circle cx="20" cy="405" r="17" />
        <rect x="50" y="390" rx={4} ry={4} width="70%" height="30" />
        <rect x="0" y="430" rx={round} ry={round} width="100%" height="150" />

        <circle cx="20" cy="625" r="17" />
        <rect x="50" y="610" rx={4} ry={4} width="70%" height="30" />
        <rect x="0" y="650" rx={round} ry={round} width="100%" height="165" />

        <rect x="0" y="850" rx={20} ry={20} width="100%" height="600" />
      </ContentLoader>
    </Box>
  )
}
