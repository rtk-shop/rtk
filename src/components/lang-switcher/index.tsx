import { cva } from 'cva'
import { setUserLocale } from '@/lib/locale'
import { useLocale } from 'next-intl'
import { locales, type Locale } from '@/i18n/config'

const langItem = cva('z-20 cursor-pointer select-none px-4 py-1 text-base font-medium', {
  variants: {
    selected: {
      true: 'text-white'
    }
  }
})

const island = cva('absolute z-10 h-full w-2/4 bg-green-400 transition-transform', {
  variants: {
    lang: {
      ua: 'translate-x-full',
      ru: 'translate-x-0'
    }
  }
})

export function LangSwitcher() {
  const locale = useLocale()

  const handleLangSelect = async (lang: Locale) => {
    setUserLocale(lang)
  }

  const view: Record<Locale, string> = {
    ua: 'Ua',
    ru: 'Ru'
  }

  return (
    <div className="relative flex bg-white">
      {locales.map((lang) => (
        <div
          key={lang}
          onClick={() => handleLangSelect(lang)}
          className={langItem({ selected: lang === locale })}
        >
          {view[lang]}
        </div>
      ))}
      <div className={island({ lang: locale as Locale })} />
    </div>
  )
}
