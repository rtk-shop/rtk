import { UserAgreement } from './user-agreement'
import { PersonalData } from './personal-data'
import { Box } from '@/components/ui/box'

export const dynamic = 'force-static'

export default function TermsPage() {
  return (
    <Box className="px-2 pt-3 pb-2 leading-4">
      <UserAgreement />
      <Box className="mt-4">
        <PersonalData />
      </Box>
    </Box>
  )
}
