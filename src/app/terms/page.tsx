import { UserAgreement } from './user-agreement'
import { PersonalData } from './personal-data'

export const dynamic = 'force-static'

export default function TermsPage() {
  return (
    <div className="px-2 pt-3 pb-2 leading-4">
      <UserAgreement />
      <div className="mt-4">
        <PersonalData />
      </div>
    </div>
  )
}
