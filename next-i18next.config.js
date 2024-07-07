/** @type {import('next-i18next').UserConfig} */

const path = require('path')

module.exports = {
  debug: false,
  localeDetection: false,
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'ua']
  },
  fallbackLng: ['ru'],
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development'
}
