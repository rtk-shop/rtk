import { parse } from 'valibot'
import { usePageState } from './model/state'
import { StepTitle } from './common/step-title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { useWatch } from 'react-hook-form'
import { customerInfoSchema } from './model/validation-schema'
import { HeightExpander } from '@/components/ui/height-expander'
import { useTranslations } from 'next-intl'
import type { CustomerInfoValues } from './model/validation-schema'

export function CustomerInfo() {
  const t = useTranslations('Common')

  const isInfoOpen = usePageState((state) => state.isInfoOpen)
  const onInfoSection = usePageState((state) => state.onInfoSection)
  const infoChecked = usePageState((state) => state.infoChecked)

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
  } catch {
    isValid = false
  }

  const handleNextClick = () => {
    infoChecked()
  }

  return (
    <section className="mb-7 rounded-lg bg-white">
      <StepTitle step={1} isEdit={isInfoOpen} onEdit={onInfoSection} valid={isValid}>
        {t('order.receiver')}
      </StepTitle>
      <HeightExpander expanded={isInfoOpen}>
        <div className="px-4 pb-4">
          <ul>
            <li>
              <Input name="name" label={t('nouns.name')} />
            </li>
            <li>
              <Input name="surname" label={t('nouns.surname')} />
            </li>
            <li>
              <PhoneInput name="phone" label={t('nouns.phone')} />
            </li>
          </ul>
          <Button color="accept" fullWidth disabled={!isValid} onClick={handleNextClick}>
            {t('verbs.continue')}
          </Button>
        </div>
      </HeightExpander>
    </section>
  )
}
