import { Currency } from './currency'
import styles from './styles.module.scss'

export function DashboardView() {
  return (
    <div className={styles.view}>
      <div style={{ display: 'flex' }}>
        <Currency />
      </div>
    </div>
  )
}
