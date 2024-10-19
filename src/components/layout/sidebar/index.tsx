import { Drawer } from '@/components/layout/drawer'
import { SidebarHead } from './head'
import { Navigation } from './navigation'
import { LangSwitcher } from '@/components/lang-switcher'
import useTranslation from 'next-translate/useTranslation'

interface SidebarProps {
  isOpen: boolean
  currency: number
  onClose(): void
}

export function Sidebar({ isOpen, currency, onClose }: SidebarProps) {
  const { t } = useTranslation('common')

  return (
    <Drawer open={isOpen} position="left" onClose={onClose}>
      <div className="h-full md:p-2">
        <div className="flex h-full w-screen max-w-80 flex-col overflow-y-auto bg-black/60 backdrop-blur-lg md:max-w-md md:rounded-xl">
          {/*  */}
          <SidebarHead onClose={onClose} />
          {/*  */}
          <Navigation onClose={onClose} />
          {/*  */}
          {/*  */}
          <div className="flex grow flex-col justify-end">
            <div className="mb-3 flex items-center justify-between px-5">
              <span className="text-lg font-medium text-white md:text-2xl">Курс:</span>
              <p className="text-lg text-white">
                <span>1$</span> = <span className="font-semibold">{currency}₴</span>
              </p>
            </div>
            <div className="mb-3 flex items-center justify-between px-5">
              <span className="text-lg font-medium text-white md:text-2xl">
                {t('drawer.lang')}:
              </span>
              <LangSwitcher />
            </div>
            <ul className="p-5 text-[14px] text-white *:flex *:justify-between">
              <li>
                Телефон: <span>{process.env.NEXT_PUBLIC_CONTACT_PHONE}</span>
              </li>
              <li>
                Прием заказов: <span>{process.env.NEXT_PUBLIC_ORDER_ACCEPTANCE_TIME}</span>
              </li>
              <li>
                Дни работы: <span>{process.env.NEXT_PUBLIC_WORKING_DAYS}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
