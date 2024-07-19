import clsx from 'clsx'
import { parse } from 'valibot'
import { StepTitle } from '../common/step-title'
import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/ui/text-input'
import { PhoneInput } from '@/components/ui/phone-input'
import { useFormContext, useWatch } from 'react-hook-form'
import { customerInfoSchema } from '../model/validation-schema'
import type { CustomerInfoValues } from '../model/validation-schema'

import styles from './styles.module.scss'

interface CustomerInfoProps {
  isEdit: boolean
  onEdit(): void
  onContinue(): void
}

export function CustomerInfo({ isEdit, onEdit, onContinue }: CustomerInfoProps) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<CustomerInfoValues>()

  const values = useWatch({
    name: ['name', 'surname', 'phone', 'email']
  })

  let isValid = false

  try {
    parse(customerInfoSchema, {
      name: values[0],
      surname: values[1],
      phone: values[2],
      email: values[3]
    })
    isValid = true
  } catch (error) {
    isValid = false
  }

  const handleNextClick = () => {
    onContinue()
  }

  return (
    <section className={styles.container}>
      <StepTitle step={1} isEdit={isEdit} onEdit={onEdit} valid={isValid}>
        Контактная информация
      </StepTitle>

      <div
        className={clsx({
          [styles.animated]: true,
          [styles.animatedOpen]: isEdit
        })}
      >
        <ul className={styles.fields}>
          <li>
            <TextInput name="name" label="Имя" register={register} errors={errors} />
          </li>
          <li>
            <TextInput name="surname" label="Фамилия" register={register} errors={errors} />
          </li>
          <li>
            <PhoneInput name="phone" label="Телефон" errors={errors} setValue={setValue} />
          </li>
          <li>
            <TextInput
              name="email"
              type="email"
              label="E-mail"
              register={register}
              errors={errors}
            />
          </li>
        </ul>
        <Button
          color="accept"
          fullWidth
          disabled={!isValid}
          onClick={handleNextClick}
          className={styles.continueButton}
        >
          Продолжить
        </Button>
      </div>
      <div className={styles.divider} />
    </section>
  )
}
