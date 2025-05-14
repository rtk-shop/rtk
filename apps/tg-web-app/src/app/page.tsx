'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Loader } from '@/components/ui/loader'
import { LogoLoader } from '@/components/ui/logo-loader'
import { useWebAppAuth } from '@/lib/api/hooks'
import { useRouter } from 'next/navigation'
import { isDevMode, routeNames } from '@/lib/constants'
import { toast } from 'sonner'
import { CAME_FROM_COOKIE_NAME } from '@/lib/session'

export default function Page() {
  const router = useRouter()

  const [authorize] = useWebAppAuth<{ initData: string }>({
    onSuccess() {
      const cameFrom = Cookies.get(CAME_FROM_COOKIE_NAME)

      if (cameFrom && cameFrom !== routeNames.root) {
        Cookies.remove(CAME_FROM_COOKIE_NAME)
        router.replace(cameFrom)
        return
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
      const initData = isDevMode
        ? process.env.NEXT_PUBLIC_TG_INIT_DATA || ''
        : window.Telegram.WebApp.initData

      const timer = setTimeout(() => {
        console.log('call useWebAppAuth.success ##')

        authorize({ initData })
      }, 2000)

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
