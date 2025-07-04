import { cva } from 'cva'
import { Banknote, CalendarDays, ChartNoAxesColumnIncreasing, Hash } from 'lucide-react'

const headerItem = cva('flex items-center font-medium text-gray-700')

const items = [
  {
    title: 'Заказ',
    icon: <Hash strokeWidth={1.5} className="size-7" />,
    className: 'col-span-2'
  },
  {
    title: 'Дата',
    icon: <CalendarDays strokeWidth={1.5} className="size-7 text-orange-400" />,
    className: 'justify-center col-span-4'
  },
  {
    title: 'Сумма',
    icon: <Banknote strokeWidth={1.5} className="size-7 text-green-600" />,
    className: 'justify-center col-span-3'
  },
  {
    title: 'Статус',
    icon: <ChartNoAxesColumnIncreasing strokeWidth={1.5} className="size-7" />,
    className: 'justify-end col-span-3'
  }
]

export function OrdersHeader() {
  return (
    <ul className="grid grid-cols-12 gap-2 sm:px-4">
      {items.map(({ title, icon, className }, index) => (
        <li key={index} className={headerItem({ class: className })}>
          <div className="sm:mr-2">{icon}</div>
          <span className="hidden sm:block">{title}</span>
        </li>
      ))}
    </ul>
  )
}
