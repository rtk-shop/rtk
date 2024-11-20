import { parse } from 'valibot'
import { StepTitle } from './common/step-title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { useWatch } from 'react-hook-form'
import { customerInfoSchema } from './model/validation-schema'
import { Expander } from './common/expander'
import { useTranslations } from 'next-intl'
import type { CustomerInfoValues } from './model/validation-schema'

interface CustomerInfoProps {
  isEdit: boolean
  onEdit(): void
  onContinue(): void
}

export function CustomerInfo({ isEdit, onEdit, onContinue }: CustomerInfoProps) {
  const t = useTranslations()

  const values = useWatch<CustomerInfoValues>({
    name: ['name', 'surname', 'phone']
  })

  let isValid = false

  try {
    parse(customerInfoSchema, {
      name: values[0],
      surname: values[1],
      phone: values[2]
    })
    isValid = true
  } catch (error) {
    isValid = false
  }

  const handleNextClick = () => {
    onContinue()
  }

  return (
    <section className="mb-7 rounded-lg bg-white">
      <StepTitle step={1} isEdit={isEdit} onEdit={onEdit} valid={isValid}>
        {t('Checkout.customer.title')}
      </StepTitle>
      <Expander open={isEdit} openHeightPx={363}>
        <div className="px-4">
          <ul>
            <li>
              <Input name="name" label={t('Common.nouns.name')} />
            </li>
            <li>
              <Input name="surname" label={t('Common.nouns.surname')} />
            </li>
            <li>
              <PhoneInput name="phone" label={t('Common.nouns.phone')} />
            </li>
          </ul>
          <Button color="accept" fullWidth disabled={!isValid} onClick={handleNextClick}>
            {t('Common.verbs.continue')}
          </Button>
        </div>
      </Expander>
    </section>
  )
}
