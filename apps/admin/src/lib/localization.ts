import { cookies } from 'next/headers'

const cookie = 'usr_i18'

export const locales = ['ru', 'ua'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(cookie)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies()

  cookieStore.set(cookie, locale, {
    maxAge: 90 * 24 * 60 * 60 // 30 days
  })
}
