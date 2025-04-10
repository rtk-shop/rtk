'use server'

import { cookies } from 'next/headers'
import { Locale, defaultLocale } from '@/i18n/config'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'USER_LOCALE'

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, locale, {
    maxAge: 90 * 24 * 60 * 60 // 30 days
  })
}
