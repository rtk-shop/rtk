import * as v from 'valibot'

const validationMessages = {
  minLength3: '* минимум 3 символов',
  minLength15: '* минимум 15 символов'
}

export const baseFields = v.object({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.minLength(15, validationMessages.minLength15)
  ),
  sku: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.minLength(3, validationMessages.minLength3)
  ),
  basePrice: v.pipe(v.number('Common.validation.requiredField'), v.minValue(1)),
  amount: v.pipe(v.number('Common.validation.requiredField'), v.minValue(1), v.maxValue(999))
})

export const validationSchema = v.intersect([baseFields])

export type FormValues = v.InferOutput<typeof validationSchema>
