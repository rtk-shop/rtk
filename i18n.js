/** @type {import('next-translate').I18nConfig} */
module.exports = {
  defaultLocale: 'ru',
  locales: ['ru', 'ua'],
  pages: {
    '*': ['common'],
    '/': ['home']
  },
  loadLocaleFrom: (lang, ns) =>
    // You can use a dynamic import, fetch, whatever. You should
    // return a Promise with the JSON file.
    import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default)
}
