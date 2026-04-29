'use client'

import { routeNames } from '@/lib/routes'
import { useTelegramBackButton, useTelegramHeaderColor } from '@/telegram/hooks'

export function TelegramAppWidgets() {
  useTelegramBackButton(routeNames.catalog)
  useTelegramHeaderColor('#f3f4f6')
  return null
}
