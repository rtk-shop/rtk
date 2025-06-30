'use client'

import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { Loader } from '@repo/ui'
import { LogoLoader } from '@/components/ui/logo-loader'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { toast } from 'sonner'
import { validateStartParam, startupCommandsPatterns } from '@/lib/web-app'

const mutator = async (url: string, { arg }: { arg: { initData: string } }): Promise<string> => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
    cache: 'no-store',
    credentials: 'include'
  })

  const respText = await resp.text()

  if (!resp.ok) throw new Error(respText)

  return respText
}

export default function Page() {
  const router = useRouter()

  const { trigger } = useSWRMutation(process.env.NEXT_PUBLIC_API_HOST + '/webapp-auth', mutator, {
    onSuccess() {
      if (typeof window !== 'undefined' && window.Telegram) {
        // DOCS: https://docs.telegram-mini-apps.com/platform/start-parameter
        const command = window.Telegram.WebApp.initDataUnsafe.start_param

        if (command) {
          if (!validateStartParam(command)) {
            console.warn('invalid start_param', command)
            router.replace(routeNames.catalog)

            return
          }

          if (command.includes(startupCommandsPatterns.product)) {
            const productId = command.split('_')[1]
            router.replace(routeNames.product + productId)
            return
          }
        }
      }

      router.replace(routeNames.catalog)
    },
    onError(err) {
      switch (err.message.trim()) {
        case 'user hash corrupted':
          toast.error('Дані телеграм пошкоджено', {
            duration: 7000
          })
          break
        case 'auth time expired':
          toast.warning('Час для авторизації вичерпаний', {
            duration: 7000
          })
          break
        default:
          toast.warning('Помилка, спробуйте пізніше', {
            duration: 8000
          })
          console.error(err.message)
          break
      }
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      const initData = window.Telegram.WebApp.initData //  process.env.NEXT_PUBLIC_TG_INIT_DATA

      const timer = setTimeout(() => {
        trigger({ initData })
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <LogoLoader size={180} />
      <div className="animate-fade-in-2s mt-6 opacity-0">
        <Loader color="secondary" />
      </div>
    </div>
  )
}
