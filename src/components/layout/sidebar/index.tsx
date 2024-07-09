import { Drawer } from '@/components/layout/drawer'
import { SidebarHead } from './head'
import { Navigation } from './navigation'
import { LangSwitcher } from '@/components/lang-switcher'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

interface SidebarProps {
  isOpen: boolean
  onClose(): void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation('common')

  return (
    <Drawer open={isOpen} position="left" onClose={onClose}>
      <div className={styles.container}>
        <SidebarHead />
        <Navigation onClose={onClose} />
        <div className={styles.langSwitch}>
          <span>{t('drawer.lang')}</span>
          <LangSwitcher />
        </div>
      </div>
    </Drawer>
  )
}
