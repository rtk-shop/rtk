'use client'

import { routeNames } from '@/lib/routes'
import { useTelegramBackButton } from '@/telegram/hooks'

export function TelegramAppWidgets() {
  useTelegramBackButton(routeNames.catalog)

  return null
}
