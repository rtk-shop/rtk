import type { TgAuthWidgetUserData } from '@/types/user'
import '@repo/ui/types/global'

declare global {
  interface Window {
    onTelegramWidgetAuth?: (user: TgAuthWidgetUserData) => void
  }
}

export {}
