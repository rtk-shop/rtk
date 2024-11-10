import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { logInSchema, LoginFormValues } from './model'
import { toast } from 'sonner'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useLogIn } from './hooks'
import useTranslation from 'next-translate/useTranslation'

import { routeNames } from '@/lib/constants'
import { decrypt } from '@/lib/session'

export function LogIn({ onSignUp }: { onSignUp(): void }) {
  const router = useRouter()
  const { t } = useTranslation('auth')

  const { handleSubmit } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(logInSchema)
  })

  const [logIn, { loading }] = useLogIn<LoginFormValues>({
    onSuccess(data) {
      const tokenData = decrypt(data.accessToken)

      if (tokenData?.role == 'admin' || tokenData?.role == 'manager') {
        router.push(routeNames.dashboard)
      } else {
        router.push(routeNames.root)
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto max-w-xl">
      <h1 className="text-3xl font-medium">{t('logIn.title')}</h1>
      <p className="mb-5 text-neutral-400 lg:mb-6">{t('logIn.subTitle')}</p>
      <PhoneInput name="phone" label={t('logIn.fields.phone')} />
      <Input name="password" type="password" label={t('logIn.fields.password')} />
      <Button fullWidth type="submit" loading={loading} className="mt-4">
        {t('logIn.button')}
      </Button>
      <p className="m-auto mt-1 w-4/5 text-center text-sm text-neutral-500">
        {t('logIn.info', { text: t('logIn.button') })}
      </p>
      <p className="mt-4 text-center text-sm font-medium text-neutral-400">
        {t('logIn.mode')}{' '}
        <span onClick={onSignUp} className="cursor-pointer text-black hover:underline">
          {t('logIn.modeAction')}
        </span>
      </p>
    </form>
  )
}
