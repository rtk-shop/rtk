import { cva } from 'cva'

export type Tab = {
  label: string
  disabled?: boolean
}

export interface TabsPorps {
  activeTab: number
  tabs: Tab[]
  onChange(tabIndex: number): void
}

const tab = cva(
  'mr-2 select-none rounded-md border-2 px-3 py-1 text-center text-sm font-medium transition-all duration-300',
  {
    variants: {
      active: {
        true: 'text-white',
        false: ''
      },
      disabled: {
        true: 'bg-gray-200 text-gray-500',
        false: ''
      }
    },
    compoundVariants: [
      {
        active: true,
        disabled: false,
        className: 'border-black bg-black'
      },
      {
        active: false,
        disabled: false,
        className: 'cursor-pointer hover:border-gray-400'
      },
      {
        active: false,
        disabled: true,
        className: 'cursor-not-allowed border-gray-200'
      }
    ]
  }
)

export function Tabs({ activeTab, tabs, onChange }: TabsPorps) {
  const handleTabClick = (tabIndex: number, disabled: boolean): void => {
    if (disabled) return

    onChange(tabIndex)
  }

  return (
    <ul className="flex">
      {tabs.map(({ label, disabled = false }, ind) => (
        <li
          key={label}
          onClick={() => handleTabClick(ind, disabled)}
          className={tab({ active: activeTab === ind, disabled })}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
