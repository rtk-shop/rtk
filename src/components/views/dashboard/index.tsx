import { IconButton } from '@/components/ui/icon-button'
import { Currency } from './currency'
import styles from './styles.module.scss'

import Icon from '../../../../public/icons/eye.svg'
import { SvgIcon } from '@/components/ui/svg-icon'
import { useState } from 'react'

export function DashboardView() {
  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.view}>
      <div style={{ display: 'flex' }}>
        <Currency />
      </div>
      <div style={{ marginTop: '40px' }}>
        <IconButton loading={loading} onClick={() => setLoading((prev) => !prev)}>
          <SvgIcon>
            <Icon />
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  )
}
