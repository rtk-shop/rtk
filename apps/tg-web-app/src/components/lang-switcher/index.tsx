'use client'

import { setUserLocale, type Locale } from '@/lib/localization'
import { useLocale } from 'next-intl'
import { Dropdown, type Option } from '@/components/ui/dropdown'

export function LangSwitcher() {
  const locale = useLocale()

  const options: Option<Locale>[] = [
    {
      title: 'Українська',
      value: 'ua'
    },
    {
      title: 'Русский',
      value: 'ru'
    }
  ]

  const handleChange = (lang: Locale) => {
    setUserLocale(lang)
  }

  return (
    <Dropdown
      anchor="right"
      options={options}
      onChange={handleChange}
      selected={options.find((o) => o.value === locale)}
    />
  )
}
