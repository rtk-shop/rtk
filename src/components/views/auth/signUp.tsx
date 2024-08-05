import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signUpSchema, SignupFormValues } from './model'
import { valibotResolver } from '@hookform/resolvers/valibot'

import styles from './styles.module.scss'

export function SignUp({ onLogIn }: { onLogIn(): void }) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignupFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(signUpSchema)
  })

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    console.log('sign up: ', values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>Создание аккаунта</h1>
      <p className={styles.subTitle}>Введите свои данные для регистрации</p>
      <TextInput name="name" label="Имя" register={register} errors={errors} />
      <TextInput name="email" type="email" label="E-mail" register={register} errors={errors} />
      <TextInput
        name="password"
        type="password"
        label="Пароль"
        register={register}
        errors={errors}
      />
      <div className={styles.code}>
        <span>Код</span>
        <TextInput name="code" type="number" register={register} errors={errors} />
      </div>
      <Button fullWidth type="submit" className={styles.logInButton}>
        Зарегистрироваться
      </Button>
      <p className={styles.offer}>
        Нажав кнопку «Зарегистрироваться», вы принимаете условия пользовательского соглашения
      </p>
      <p className={styles.signupMessage}>
        Уже есть аккаунт? <span onClick={onLogIn}>Войти сейчас</span>
      </p>
    </form>
  )
}
