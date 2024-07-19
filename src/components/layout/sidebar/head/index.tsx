import Image from 'next/image'
import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import CrossIcon from '../../../../../public/icons/cross.svg'

import styles from './styles.module.scss'

export function SidebarHead({ onClose }: { onClose(): void }) {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image priority={true} width={150} height={40} src="/assets/logo.svg" alt="логотип" />
      </div>

      <IconButton disableRipple onClick={onClose} className={styles.closeButton}>
        <SvgIcon className={styles.closeIcon}>
          <CrossIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
