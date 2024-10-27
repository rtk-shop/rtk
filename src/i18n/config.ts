export const locales = ['ru', 'ua'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'
