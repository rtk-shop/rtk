import { useTranslations } from 'next-intl'
import { LangSwitcher } from '@/components/lang-switcher'
import { Box } from '@/components/ui/box'
import { WidgetGrid } from './ui/widget-grid'
import { Widget } from './ui/widget'
import { DoneOrdersCount } from './widgets/done-orders-count'
import { Offer } from './widgets/offer'
import { Orders } from './orders'
import { TelegramAppWidgets } from './telegram'

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
      <Box className="h-full px-2 pt-1">
        <Box flex="col" className="h-full">
          <Box as="section" flex="row" align="center" justify="between" className="my-3">
            <h2 className="text-lg font-medium tracking-tight">{t('Common.nouns.ilang')}</h2>
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
                <Offer />
              </Widget>
            </WidgetGrid>
          </Box>
          <Box as="section" className="h-full">
            <Orders />
          </Box>
        </Box>
        <TelegramAppWidgets />
      </Box>
    </>
  )
}
