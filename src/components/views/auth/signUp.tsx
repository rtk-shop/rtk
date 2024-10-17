import { TextInput } from '@/components/ui/text-input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { signUpSchema, SignupFormValues } from './model'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSignUp } from './hooks'
import { routeNames } from '@/lib/navigation'
import { toast } from 'sonner'
import useTranslation from 'next-translate/useTranslation'

export function SignUp({ onLogIn }: { onLogIn(): void }) {
  const router = useRouter()
  const { t } = useTranslation('auth')

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<SignupFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(signUpSchema)
  })

  const [signUp, { loading }] = useSignUp<SignupFormValues>({
    onSuccess() {
      router.push(routeNames.root)
    },
    onError(err) {
      toast.warning(t(err))
    }
  })

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    toast.dismiss()
    signUp(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto max-w-xl">
      <h1 className="text-3xl font-medium">{t('signUp.title')}</h1>
      <p className="mb-5 text-neutral-400 lg:mb-6">{t('signUp.subTitle')}</p>
      <TextInput name="name" label={t('signUp.fields.name')} register={register} errors={errors} />
      <PhoneInput
        name="phone"
        label={t('signUp.fields.phone')}
        setValue={setValue}
        errors={errors}
      />
      <TextInput
        name="password"
        type="password"
        label={t('signUp.fields.password')}
        register={register}
        errors={errors}
      />
      <div className="flex justify-end">
        <span className="mr-4 mt-3 font-medium">{t('signUp.fields.code')}</span>
        <TextInput name="code" type="number" register={register} errors={errors} />
      </div>
      <Button fullWidth type="submit" loading={loading} className="mt-4">
        {t('signUp.button')}
      </Button>
      <p className="m-auto mt-1 w-4/5 text-center text-sm text-neutral-500">
        {t('signUp.info', { text: t('signUp.button') })}
      </p>
      <p className="mt-4 text-center text-sm font-medium text-neutral-400">
        {t('signUp.mode')}{' '}
        <span onClick={onLogIn} className="cursor-pointer text-black hover:underline">
          {t('signUp.modeAction')}
        </span>
      </p>
    </form>
  )
}
