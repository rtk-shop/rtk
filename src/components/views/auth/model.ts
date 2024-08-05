import * as v from 'valibot'

export const common = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('* обязательное поле'),
    v.email('* значение не похоже на email '),
    v.maxLength(70, '* максимум 70 символов')
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('* обязательное поле'),
    v.minLength(6, '* минимум 6 символов'),
    v.maxLength(30, '* максимум 30 символов')
  )
})

export const logInSchema = v.object({ ...common.entries })

export const signUpSchema = v.object({
  ...common.entries,
  name: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('* обязательное поле'),
    v.minLength(1, '* введите имя'),
    v.maxLength(30, '* максимум 30 символов')
  ),
  code: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('* обязательное поле'),
    v.length(5, '* должно быть 5 символов')
  )
})

export type LoginFormValues = v.InferOutput<typeof logInSchema>
export type SignupFormValues = v.InferOutput<typeof signUpSchema>
