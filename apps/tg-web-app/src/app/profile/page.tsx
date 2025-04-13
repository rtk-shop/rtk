import { LangSwitcher } from '@/components/lang-switcher'
import { OrderRejectModal } from './modals/reject-order'
import { Orders } from './orders'
import { useTranslations } from 'next-intl'

export default function Profile() {
  const t = useTranslations('Common')

  return (
    <div className="h-dvh px-2 pb-12">
      <div className="flex h-full flex-col">
        <div className="my-3 flex items-center justify-between">
          <h2 className="mb-2 text-xl font-medium">{t('nouns.ilang')}</h2>
          <div className="mr-4">
            <LangSwitcher />
          </div>
        </div>
        {/* mt-auto */}
        <div className="h-full">
          <h2 className="mb-2 text-xl font-medium">Мои заказы</h2>
          <Orders />
        </div>
      </div>
      <OrderRejectModal />
    </div>
  )
}
