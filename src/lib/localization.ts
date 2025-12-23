'use server'

import { cookies } from 'next/headers'

export type Locale = (typeof locales)[number]
const locales = ['ru', 'ua'] as const

const COOKIE_NAME = 'u_lng'

const defaultLocale: Locale = 'ua'

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
