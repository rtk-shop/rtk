import { TelegramWebApps } from 'telegram-webapps'
import '@repo/assets'

export {}

declare global {
  interface Window {
    Telegram: { WebApp: TelegramWebApps.WebApp }
  }
}
