import clsx from 'clsx'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

const locales = {
  ua: 'Ua',
  ru: 'Ru'
}

export function LangSwitcher() {
  const router = useRouter()
  const { locale = 'ua', pathname, asPath, query } = router

  const handleLangSelect = (lang: string) => {
    router.push({ pathname, query }, asPath, { locale: lang })
  }

  return (
    <div className={styles.container}>
      {Object.keys(locales).map((lang) => (
        <span
          key={lang}
          onClick={() => handleLangSelect(lang)}
          className={clsx(styles.lang, lang === locale && styles.current)}
        >
          {locales[lang as keyof typeof locales]}
        </span>
      ))}
      <div className={clsx(styles.island, locale === 'ua' && styles.ua)} />
    </div>
  )
}
