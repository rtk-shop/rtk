'use client'
import { Loader } from '@/components/ui/loader'
import { LogoLoader } from '@/components/ui/logo-loader'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    console.log(typeof window !== 'undefined', window.Telegram)

    if (typeof window !== 'undefined' && window.Telegram) {
      window.Telegram.WebApp.ready()
      Telegram.WebApp.expand()
      Telegram.WebApp.setHeaderColor('#ffffff')
      // const initData = Telegram.WebApp.initData
      // console.log('Init Data:', 'hi')
    }
  }, [])

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <LogoLoader size={180} />
      <div
        className="animate-fade-in mt-6 opacity-0"
        style={{
          animationDelay: '2s'
        }}
      >
        <Loader color="dark" />
      </div>
    </div>
  )
}
