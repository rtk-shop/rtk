import { Box } from '@/components/ui/box'
import { Orders } from './orders'
import { LangSwitcher } from '@/components/lang-switcher'
import { useTranslations } from 'next-intl'
import { TelegramAppWidgets } from './telegram'
import { WidgetGrid } from './ui/widget-grid'
import { Widget } from './ui/widget'
import { DoneOrdersCount } from './widgets/done-orders-count'

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
            <Box className="text-sm">
              <LangSwitcher />
            </Box>
          </Box>
          <Box as="section" className="mb-3">
            <WidgetGrid>
              <Widget title="Отримано замовлень" className="col-span-6 row-span-2">
                <DoneOrdersCount />
              </Widget>
              <Widget title="Для вас" className="col-span-6 row-span-2">
                <div></div>
              </Widget>
            </WidgetGrid>
          </Box>
          <Box className="h-full">
            <Orders />
          </Box>
        </Box>
        <TelegramAppWidgets />
      </Box>
    </>
  )
}
