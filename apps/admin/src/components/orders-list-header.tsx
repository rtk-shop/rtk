import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

const headerItem = cva('flex items-center font-medium text-gray-700')

const items = [
  {
    title: 'Заказ',
    icon: <Icon name="common/menu" className="text-black" />,
    className: 'col-span-2'
  },
  {
    title: 'Дата',
    icon: <Icon name="common/calendar" className="text-yellow-600" />,
    className: 'justify-center col-span-4'
  },
  {
    title: 'Сумма',
    icon: <Icon className="text-green-600" name="common/tags" />,
    className: 'justify-center col-span-3'
  },
  {
    title: 'Статус',
    icon: <Icon name="common/signal" className="text-green-600" />,
    className: 'justify-end col-span-3'
  }
]

export function OrdersHeader() {
  return (
    <ul className="grid grid-cols-12 gap-2 sm:px-4">
      {items.map(({ title, icon, className }, index) => (
        <li key={index} className={headerItem({ class: className })}>
          <div className="text-2xl sm:mr-2">{icon}</div>
          <span className="hidden sm:block">{title}</span>
        </li>
      ))}
    </ul>
  )
}
