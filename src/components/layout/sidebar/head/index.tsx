import Image from 'next/image'
import styles from './styles.module.scss'

export function SidebarHead() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image priority={true} width={150} height={40} src="/assets/logo.svg" alt="логотип" />
      </div>
    </div>
  )
}
