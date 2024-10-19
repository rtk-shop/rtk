import { cva } from 'cva'
import { useRouter } from 'next/router'

const locales = {
  ua: 'Ua',
  ru: 'Ru'
}

type Lang = keyof typeof locales

const langItem = cva('z-20 cursor-pointer select-none px-4 py-1 text-base font-medium', {
  variants: {
    selected: {
      true: 'text-white'
    }
  }
})

const island = cva('w-2/4 h-full z-10 bg-green-400 absolute transition-transform', {
  variants: {
    lang: {
      ru: 'translate-x-full',
      ua: 'translate-x-0'
    }
  }
})

export function LangSwitcher() {
  const router = useRouter()
  const { locale = 'ru', pathname, asPath, query } = router

  const handleLangSelect = (lang: string) => {
    router.push({ pathname, query }, asPath, { locale: lang })
  }

  return (
    <div className="relative flex bg-white">
      {Object.keys(locales).map((lang) => (
        <span
          key={lang}
          onClick={() => handleLangSelect(lang)}
          className={langItem({ selected: lang === locale })}
        >
          {locales[lang as Lang]}
        </span>
      ))}
      <div className={island({ lang: locale as Lang })} />
    </div>
  )
}
