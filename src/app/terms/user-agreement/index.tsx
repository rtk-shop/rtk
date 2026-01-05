import { Box } from '@/components/ui/box'
import { TermsDefinitions } from './definitions'
import { GeneralTerms } from './general'
import { ForceMajeureTerms } from './force-majeure'

export function UserAgreement() {
  return (
    <Box>
      <h1 className="mb-2 text-xl font-medium">Угода користувача</h1>
      <p className="mb-1">
        Вчинення дій особами (далі іменовані «Користувач»/ «Покупець», а в множині «Користувачі»/
        «Покупці»), спрямованих на користування Онлайн-платформою {process.env.NEXT_PUBLIC_APP_NAME}
        , вважається безумовним прийняттям усіх положень цієї Угоди.
      </p>
      <p className="mb-3">
        Користувач цим визнає, що акцепт Угоди рівносильний підписанню та укладенню Угоди на умовах,
        викладених в цій Угоді. У випадку визнання недійсною або нездійсненною будь-якої частини
        даної Угоди користувача, інші її частини будуть залишатися чинними.
      </p>

      <TermsDefinitions />
      <GeneralTerms />
      <ForceMajeureTerms />
    </Box>
  )
}
