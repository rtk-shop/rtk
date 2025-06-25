import * as v from 'valibot'
import { productGender, productCategory } from '@/lib/constants'

const validationMessages = {
  minLength3: '* минимум 3 символов',
  minLength15: '* минимум 15 символов'
}

// $preview: Upload!
// $images: [ProductImageInput!]!
// $description: HTML!
// $sizeName: String!
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
  category: v.picklist(
    [
      productCategory.suitcase,
      productCategory.backpack,
      productCategory.bag,
      productCategory.other
    ],
    'Common.validation.requiredField'
  )
})

export const validationSchema = v.intersect([baseFields])

export type FormValues = v.InferOutput<typeof validationSchema>
