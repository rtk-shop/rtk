import * as v from 'valibot'
import { productGender, productCategory } from '@/lib/constants'

const validationMessages = {
  minLength3: '* минимум 3 символов',
  minLength15: '* минимум 15 символов'
}

// $preview: Upload!
// $images: [ProductImageInput!]!

// $brandName: String!
// $defaultSizeID: Int!
// $tag: ProductTag

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
  amount: v.pipe(v.number('Common.validation.requiredField'), v.minValue(1), v.maxValue(999)),
  gender: v.picklist(
    [productGender.male, productGender.female, productGender.unisex],
    'Common.validation.requiredField'
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
    category: v.picklist(
      [
        productCategory.suitcase,
        productCategory.backpack,
        productCategory.bag,
        productCategory.other
      ],
      'Common.validation.requiredField'
    ),
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

export const validationSchema = v.intersect([baseFields, categorySchema])

export type FormValues = v.InferOutput<typeof validationSchema>
