import clsx from 'clsx'
import { ChangeEvent } from 'react'
import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import PlusIcon from '../../../../../../../public/icons/plus.svg'
import MinusIcon from '../../../../../../../public/icons/minus.svg'

import styles from './styles.module.scss'

interface AmauntProps {
  amount: number
  onChange(type: 'add' | 'sub' | number): void
  max?: number
}

export function Amaunt({ amount, onChange, max = 30 }: AmauntProps) {
  const min = 1

  const handleAddClick = () => {
    onChange('add')
  }

  const handleSubClick = () => {
    onChange('sub')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value

    if (value < min) {
      onChange(min)
      return
    }
    if (value <= max) {
      onChange(value)
    }
  }

  return (
    <div className={styles.container}>
      <IconButton
        disableRipple
        onClick={handleSubClick}
        disabled={amount <= 1}
        aria-label="удалить одну единицу данного продукта"
        className={clsx(styles.button, styles.left)}
      >
        <SvgIcon className={styles.icon}>
          <MinusIcon />
        </SvgIcon>
      </IconButton>
      <div className={styles.counter}>
        <input
          type="number"
          min={min}
          onChange={handleInputChange}
          value={amount}
          className={styles.input}
        />
      </div>
      <IconButton
        disableRipple
        onClick={handleAddClick}
        disabled={!!max && amount >= max}
        aria-label="добавить одну единицу данного продукта"
        className={clsx(styles.button, styles.right)}
      >
        <SvgIcon className={styles.icon}>
          <PlusIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
