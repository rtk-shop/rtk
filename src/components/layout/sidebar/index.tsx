import { Drawer } from '@/components/ui/drawer'
import { SidebarHead } from './head'
import { Categories } from './categories'
import { LangSwitcher } from '@/components/lang-switcher'
import useTranslation from 'next-translate/useTranslation'

interface SidebarProps {
  isOpen: boolean
  onClose(): void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation('common')

  return (
    <Drawer open={isOpen} position="left" onClose={onClose}>
      <div className="h-full">
        <div className="flex h-full w-screen max-w-80 flex-col overflow-y-auto bg-black/60 backdrop-blur-lg">
          {/*  */}
          <SidebarHead onClose={onClose} />
          {/*  */}
          <Categories />
          {/*  */}
          <div className="flex grow flex-col justify-end">
            <div className="mb-3 flex items-center justify-between px-5">
              <span className="text-lg font-medium text-white">{t('drawer.lang')}:</span>
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
