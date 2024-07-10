import clsx from 'clsx'
import styles from './styles.module.scss'

interface TabsPorps {
  activeTab: number
  tabs: Array<{
    label: string
    disabled?: boolean
  }>
  onChange(tabIndex: number): void
}

export function Tabs({ activeTab, tabs, onChange }: TabsPorps) {
  const handleTabClick = (tabIndex: number, disabled: boolean): void => {
    if (disabled) return

    onChange(tabIndex)
  }

  return (
    <ul className={styles.tabList}>
      {tabs.map(({ label, disabled = false }, ind) => (
        <li
          key={label}
          onClick={() => handleTabClick(ind, disabled)}
          className={clsx({
            [styles.tab]: true,
            [styles.active]: activeTab === ind,
            [styles.disabled]: disabled
          })}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
