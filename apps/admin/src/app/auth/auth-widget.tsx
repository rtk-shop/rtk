'use client'

import { useEffect, useRef } from 'react'
import type { TgAuthWidgetUserData } from '@/types/user'

export function AuthWidget({ onAuth }: { onAuth(user: TgAuthWidgetUserData): void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    window.onTelegramWidgetAuth = (user) => {
      onAuth({ ...user })
    }

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true

    script.setAttribute('data-telegram-login', 'shop_rtk_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-radius', '10')
    script.setAttribute('data-onauth', 'onTelegramWidgetAuth(user)')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-lang', 'ru')

    containerRef.current?.appendChild(script)

    return () => {
      delete window.onTelegramWidgetAuth
      containerRef.current?.removeChild(script)
    }
  }, [])

  return <div className="flex items-center justify-center" ref={containerRef} />
}
