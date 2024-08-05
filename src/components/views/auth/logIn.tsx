import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { logInSchema, LoginFormValues } from './model'
import { valibotResolver } from '@hookform/resolvers/valibot'

import styles from './styles.module.scss'

export function LogIn({ onSignUp }: { onSignUp(): void }) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(logInSchema)
  })

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    console.log('log in: ', values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>Здравствуйте!</h1>
      <p className={styles.subTitle}>Введите свои данные для авторизации</p>
      <TextInput name="email" type="email" label="E-mail" register={register} errors={errors} />
      <TextInput
        name="password"
        type="password"
        label="Пароль"
        register={register}
        errors={errors}
      />
      <Button fullWidth type="submit" className={styles.logInButton}>
        Войти
      </Button>
      <p className={styles.offer}>
        Нажав кнопку «Войти», вы принимаете условия пользовательского соглашения
      </p>

      <p className={styles.signupMessage}>
        Нет аккаунта? <span onClick={onSignUp}>Зарегистрироваться сейчас</span>
      </p>
    </form>
  )
}
