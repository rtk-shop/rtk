import React from 'react'
import clsx from 'clsx'
import ExpandIcon from '../../../public/icons/expand-arrow.svg'

import styles from './styles.module.scss'

interface CollapseHeadProps {
  collapsed: boolean
  title: string | React.ReactNode
  onCollapse(): void
}

export function CollapseHead({ title, collapsed, onCollapse }: CollapseHeadProps) {
  return (
    <div onClick={onCollapse} className={styles.groupHead}>
      <span>{title}</span>
      <div
        className={clsx({
          ['svg-icon']: true,
          [styles.expandIcon]: true,
          [styles.collapsed]: collapsed
        })}
      >
        <ExpandIcon />
      </div>
    </div>
  )
}
