import clsx from 'clsx'
import { Drawer } from '@/components/layout/drawer'
import { SidebarHead } from './head'
import { Navigation } from './navigation'
import { LangSwitcher } from '@/components/lang-switcher'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

interface SidebarProps {
  isOpen: boolean
  currency: number
  onClose(): void
}

export function Sidebar({ isOpen, currency, onClose }: SidebarProps) {
  const { t } = useTranslation('common')

  return (
    <Drawer open={isOpen} position="left" onClose={onClose}>
      <div className={styles.container}>
        <SidebarHead onClose={onClose} />
        <div className={clsx(styles.section, styles.currency)}>
          <span className={styles.sectionTitle}>Курс:</span>
          <p className={styles.currencyValue}>
            <span>1$</span> = <b>{currency}₴</b>
          </p>
        </div>
        <Navigation onClose={onClose} />
        <div className={clsx(styles.section, styles.lang)}>
          <span className={styles.sectionTitle}>{t('drawer.lang')}:</span>
          <LangSwitcher />
        </div>
        <ul className={styles.info}>
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
    </Drawer>
  )
}
