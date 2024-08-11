import * as v from 'valibot'

export const common = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common:validation.requiredField'),
    v.email('common:validation.wrongEmail'),
    v.maxLength(60, 'common:validation.maxLength60')
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common:validation.requiredField'),
    v.minLength(6, 'common:validation.minLength6'),
    v.maxLength(30, 'common:validation.maxLength30')
  )
})

export const logInSchema = v.object({ ...common.entries })

export const signUpSchema = v.object({
  ...common.entries,
  name: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common:validation.requiredField'),
    v.maxLength(70, 'common:validation.maxLength70')
  ),
  code: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common:validation.requiredField'),
    v.length(5, 'common:validation.lengthEquals5')
  )
})

export type LoginFormValues = v.InferOutput<typeof logInSchema>
export type SignupFormValues = v.InferOutput<typeof signUpSchema>
