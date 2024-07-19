import {
  InferOutput,
  object,
  string,
  minLength,
  maxLength,
  trim,
  email,
  length,
  pipe
} from 'valibot'

export const customerInfoSchema = object({
  name: pipe(
    string(),
    trim(),
    minLength(1, '* минимум 1 символ'),
    maxLength(30, '* максимум 30 символов')
  ),
  surname: pipe(
    string(),
    trim(),
    minLength(1, '* минимум 1 символ'),
    maxLength(30, '* максимум 30 символов')
  ),
  email: pipe(
    string(),
    trim(),
    minLength(3, '* введите email'),
    email('The email is badly formatted.'),
    maxLength(70, '* максимум 70 символов')
  ),
  phone: pipe(string(), trim(), length(10, 'The array must contain 10 numbers.'))
})

export const deliverySchema = object({
  supplier: string(),
  cityName: pipe(string(), minLength(1)),
  postOfficeName: string()
})

export const validationSchema = object({
  ...customerInfoSchema.entries,
  ...deliverySchema.entries
})

export type FormValues = InferOutput<typeof validationSchema>
export type CustomerInfoValues = InferOutput<typeof customerInfoSchema>
export type DeliveryValues = InferOutput<typeof deliverySchema>
