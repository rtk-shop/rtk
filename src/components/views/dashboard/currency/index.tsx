import { useState } from 'react'
import { Loader } from '@/components/ui/loader'
import { SvgIcon } from '@/components/ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import { formatDate } from '@/lib/helpers'
import { EditMode } from './edit-mode'
import EditIcon from '../../../../../public/icons/edit.svg'
import WarningIcon from '../../../../../public/icons/warning.svg'

import styles from './styles.module.scss'

export function Currency() {
  const [editMode, setEditMode] = useState(false)

  const data = {
    globalData: {
      id: '1',
      usdCourse: 41.7,
      updatedAt: new Date().toISOString()
    }
  }

  const error = null
  const loading = false

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.warning}>
          <SvgIcon className={styles.warningIcon}>
            <WarningIcon />
          </SvgIcon>
          <p>Ошибка получения данных</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader />
        </div>
      </div>
    )
  }

  if (editMode) {
    return <EditMode onExit={() => setEditMode(false)} />
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Курс доллара</p>
      <p className={styles.currency}>1$ = {data && data.globalData.usdCourse} грн.</p>
      <p className={styles.changedAt}>
        Изменено: <span>{data && formatDate(data.globalData.updatedAt)}</span>
      </p>
      <IconButton disableRipple onClick={() => setEditMode(true)} className={styles.editButton}>
        <SvgIcon>
          <EditIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
