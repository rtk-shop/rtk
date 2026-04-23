'use client'

import { routeNames } from '@/lib/routes'
import { useTelegramBackButton, useTelegramHeaderColor } from '@/telegram/hooks'

export function TelegramAppWidgets() {
  useTelegramBackButton(routeNames.catalog)
  useTelegramHeaderColor('#f9fafb')
  return null
}
