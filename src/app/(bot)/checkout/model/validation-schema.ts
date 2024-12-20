import * as v from 'valibot'

export const customerInfoSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.maxLength(70, 'Common.validation.maxLength70')
  ),
  surname: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.maxLength(70, 'Common.validation.maxLength70')
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.length(9, 'Common.validation.wrongPhone')
  )
})

export const deliverySchema = v.pipe(
  v.object({
    supplier: v.picklist(['nova', 'ukr']),
    cityName: v.pipe(v.string(), v.minLength(1)),
    postOfficeName: v.pipe(v.string(), v.trim(), v.nonEmpty('Common.validation.requiredField')),
    patronymic: v.optional(v.string())
  }),
  v.forward(
    v.check((input) => input.supplier !== 'ukr', 'CUSTOM'),
    ['patronymic']
  )
)

export const metaSchema = v.object({
  'np-delivery-type': v.string()
})

export const validationSchema = v.intersect([customerInfoSchema, deliverySchema, metaSchema])

export type FormValues = v.InferOutput<typeof validationSchema>
export type CustomerInfoValues = v.InferOutput<typeof customerInfoSchema>
export type DeliveryValues = v.InferOutput<typeof deliverySchema>
export type MetaValues = v.InferOutput<typeof metaSchema>
