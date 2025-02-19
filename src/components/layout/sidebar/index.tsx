import { Drawer } from '@/components/ui/drawer'
import { SidebarHead } from './head'
import { Categories } from './categories'
import { useAppState } from '@/stores/app/store'
// import { useTranslations } from 'next-intl'

export function Sidebar() {
  // const t = useTranslations('Common')

  const isSidebarOpen = useAppState((state) => state.isSidebarOpen)
  const closeSidebar = useAppState((state) => state.closeSidebar)

  return (
    <Drawer open={isSidebarOpen} position="left" onClose={closeSidebar}>
      <div className="h-full w-80">
        <div className="flex h-full flex-col overflow-y-auto bg-black/60 backdrop-blur-lg">
          {/*  */}
          <SidebarHead onClose={closeSidebar} />
          {/*  */}
          <Categories />
          {/*  */}
          {process.env.NODE_ENV === 'development' && (
            <a className="mt-2 text-center font-medium text-white underline" href="/sandbox">
              SANDBOX
            </a>
          )}
          <div className="flex grow flex-col justify-end"></div>
          <ul className="p-5 text-sm text-white *:flex *:justify-between">
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
    </Drawer>
  )
}
