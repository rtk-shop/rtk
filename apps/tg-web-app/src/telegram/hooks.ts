import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function createBackHandler(router: ReturnType<typeof useRouter>, fallback: string) {
  return () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }
}

export function useTelegramBackButton(fallback: string) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.Telegram) return

    const backButton = window.Telegram.WebApp.BackButton
    backButton.show()

    const handler = createBackHandler(router, fallback)

    // backButton.onClick doesn't remove previous handlers.
    // If you call it three times, three functions will be called in a row.
    backButton.offClick(handler)
    backButton.onClick(handler)

    return () => {
      backButton.offClick(handler)
      backButton.hide()
    }
  }, [router, fallback])
}
