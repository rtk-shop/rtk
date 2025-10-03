import { Orders } from './orders'
import { LangSwitcher } from '@/components/lang-switcher'
import { useTranslations } from 'next-intl'

export default function Profile() {
  const t = useTranslations()

  return (
    <>
      <style precedence="high">
        {`
          main {
            height: 100dvh;
          }
        `}
      </style>
      <div className="h-full px-2">
        <div className="flex h-full flex-col">
          <div className="my-3 flex items-center justify-between">
            <h2 className="text-xl font-medium">{t('Common.nouns.ilang')}</h2>
            <LangSwitcher />
          </div>
          <div className="h-full">
            <Orders />
          </div>
        </div>
      </div>
    </>
  )
}
