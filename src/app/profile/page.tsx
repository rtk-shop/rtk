import { Box } from '@/components/ui/box'
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
      <Box className="h-full px-2">
        <Box flex="col" className="h-full">
          <Box flex="row" align="center" justify="between" className="my-3">
            <h2 className="text-xl font-medium">{t('Common.nouns.ilang')}</h2>
            <LangSwitcher />
          </Box>
          <Box className="h-full">
            <Orders />
          </Box>
        </Box>
      </Box>
    </>
  )
}
