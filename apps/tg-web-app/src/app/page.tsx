'use client'

import { useEffect } from 'react'
import { Loader } from '@repo/ui'
import { LogoLoader } from '@/components/ui/logo-loader'
import { useWebAppAuth } from '@/lib/api/hooks'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/constants'
import { toast } from 'sonner'
import { validateStartParam, startupCommandsPatterns } from '@/lib/web-app'

export default function Page() {
  const router = useRouter()

  const [authorize] = useWebAppAuth<{ initData: string }>({
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
    onError(errorMsg) {
      switch (errorMsg.trim()) {
        case 'user hash corrupted':
          toast.error('Данные телеграм повреждены', {
            duration: 7000
          })
          break
        case 'auth time expired':
          toast.warning('Время для авторизации исчерпано', {
            duration: 7000
          })
          break
        default:
          toast.warning('Приложеник вне контекста Telegram', {
            duration: 8000
          })
          console.error(errorMsg)
          break
      }
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      const initData = window.Telegram.WebApp.initData //  process.env.NEXT_PUBLIC_TG_INIT_DATA

      const timer = setTimeout(() => {
        authorize({ initData })
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [authorize])

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <LogoLoader size={180} />
      <div className="animate-fade-in-2s mt-6 opacity-0">
        <Loader color="dark" />
      </div>
    </div>
  )
}
