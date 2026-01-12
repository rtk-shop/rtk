'use client'

import { routeNames } from '@/lib/routes'
import { useTelegramBackButton, useTelegramHeaderColor } from '@/telegram/hooks'

export function TelegramAppWidgets() {
  useTelegramHeaderColor('#fff')
  useTelegramBackButton(routeNames.catalog)

  return null
}
