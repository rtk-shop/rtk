import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { logInSchema, LoginFormValues } from './model'
import { toast } from 'sonner'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useLogIn } from './hooks'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

export function LogIn({ onSignUp }: { onSignUp(): void }) {
  const { t } = useTranslation('auth')

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(logInSchema)
  })

  const [logIn, { loading }] = useLogIn<LoginFormValues>({
    onSuccess(data) {
      console.log('sucess', data)
    },
    onError(err) {
      toast.warning(t(err))
    }
  })

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    toast.dismiss()
    logIn(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>{t('logIn.title')}</h1>
      <p className={styles.subTitle}>{t('logIn.subTitle')}</p>
      <TextInput
        name="email"
        type="email"
        label={t('logIn.fields.email')}
        register={register}
        errors={errors}
      />
      <TextInput
        name="password"
        type="password"
        label={t('logIn.fields.password')}
        register={register}
        errors={errors}
      />
      <Button fullWidth type="submit" loading={loading} className={styles.logInButton}>
        {t('logIn.button')}
      </Button>
      <p className={styles.offer}>{t('logIn.info', { text: t('logIn.button') })}</p>
      <p className={styles.modeController}>
        {t('logIn.mode')} <span onClick={onSignUp}>{t('logIn.modeAction')}</span>
      </p>
    </form>
  )
}
