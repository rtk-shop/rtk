import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signUpSchema, SignupFormValues } from './model'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSignUp } from './hooks'
import { toast } from 'sonner'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

export function SignUp({ onLogIn }: { onLogIn(): void }) {
  const { t } = useTranslation('auth')

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignupFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(signUpSchema)
  })

  const [signUp, { loading }] = useSignUp<SignupFormValues>({
    onSuccess(data) {
      console.log('sucess', data)
    },
    onError(err) {
      toast.warning(t(err))
    }
  })

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    signUp(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>{t('signUp.title')}</h1>
      <p className={styles.subTitle}>{t('signUp.subTitle')}</p>
      <TextInput name="name" label={t('signUp.fields.name')} register={register} errors={errors} />
      <TextInput
        name="email"
        type="email"
        label={t('signUp.fields.email')}
        register={register}
        errors={errors}
      />
      <TextInput
        name="password"
        type="password"
        label={t('signUp.fields.password')}
        register={register}
        errors={errors}
      />
      <div className={styles.code}>
        <span>{t('signUp.fields.code')}</span>
        <TextInput name="code" type="number" register={register} errors={errors} />
      </div>
      <Button fullWidth type="submit" loading={loading} className={styles.logInButton}>
        {t('signUp.button')}
      </Button>
      <p className={styles.offer}>{t('signUp.info', { text: t('signUp.button') })}</p>
      <p className={styles.modeController}>
        {t('signUp.mode')} <span onClick={onLogIn}>{t('signUp.modeAction')}</span>
      </p>
    </form>
  )
}
