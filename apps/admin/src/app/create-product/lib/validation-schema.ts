import * as v from 'valibot'
import { CategoryType, Gender } from '@/lib/api/graphql/types'

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
  // tag: v.optional(v.picklist([productTag.top, productTag.new, productTag.stock])),
  basePrice: v.pipe(v.number('Common.validation.requiredField'), v.minValue(1)),
  amount: v.pipe(v.number('Common.validation.requiredField'), v.minValue(1), v.maxValue(999)),
  gender: v.picklist(Object.values(Gender), 'Common.validation.requiredField'),
  brandName: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.minLength(3, validationMessages.minLength3)
  ),
  description: v.pipe(
    v.string('Common.validation.requiredField'),
    v.trim(),
    v.nonEmpty('Common.validation.requiredField'),
    v.minLength(15, validationMessages.minLength15)
  )
})

export const categorySchema = v.pipe(
  v.object({
    category: v.picklist(Object.values(CategoryType), 'Common.validation.requiredField'),
    sizeName: v.optional(v.string())
  }),
  v.forward(
    v.check(
      (input) => input.category === 'OTHER' || !!input.sizeName,
      'Common.validation.requiredField'
    ),
    ['sizeName']
  )
)

export const imagesSchema = v.pipe(
  v.object({
    preview: v.instance(File),
    images: v.pipe(
      v.array(
        v.object({
          image: v.instance(File),
          order: v.number()
        })
      ),
      v.minLength(2, 'Добавьте как минимум два изображения')
    )
  }),
  v.check((input) => {
    const orders = input.images.map((img) => img.order)
    return new Set(orders).size === orders.length
  }, 'Порядок изображений должен быть уникальным')
)

export const validationSchema = v.intersect([baseFields, imagesSchema, categorySchema])

export type FormValues = v.InferOutput<typeof validationSchema>

type x = FormValues['sizeName']
