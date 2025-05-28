'use client'

import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import { AuthWidget } from './auth-widget'
import { Loader } from '@repo/ui'
import type { TgAuthWidgetUserData } from '@/types/user'

const mutator = async (url: string, { arg }: { arg: TgAuthWidgetUserData }): Promise<string> => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
    cache: 'no-store'
  })

  const respText = await resp.text()

  if (!resp.ok) throw new Error(respText)

  return respText
}

export default function Auth() {
  const { trigger, isMutating } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_HOST + '/tg-oauth',
    mutator,
    {
      onSuccess(data) {
        console.log('log in', data)
      },
      onError(err) {
        switch (err.message.trim()) {
          case 'user hash corrupted':
            toast.error('Ошибка OAuth данных', {
              duration: 7000
            })
            break
          case 'auth time expired':
            toast.warning('Время для авторизации исчерпано', {
              duration: 5000
            })
            break
          default:
            toast.error('Ошибка авторизации', {
              duration: 8000
            })
            console.error(err)
            break
        }
      }
    }
  )

  const handleOAuthStart = (user: TgAuthWidgetUserData) => {
    trigger(user)
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <div>{isMutating ? <Loader color="dark" /> : <AuthWidget onAuth={handleOAuthStart} />}</div>
    </div>
  )
}
