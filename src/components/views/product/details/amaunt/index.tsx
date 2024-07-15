import clsx from 'clsx'
import { useState, ChangeEvent } from 'react'
import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import PlusIcon from '../../../../../../public/icons/plus.svg'
import MinusIcon from '../../../../../../public/icons/minus.svg'

import styles from './styles.module.scss'

interface AmauntProps {}

export function Amaunt(props: AmauntProps) {
  const [amount, setAmount] = useState(1)
  const max = 100
  const min = 1

  const handleAddClick = () => {
    setAmount((prev) => prev + 1)
  }
  const handleSubClick = () => {
    setAmount((prev) => {
      if (prev === 1) return prev
      return prev - 1
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value

    if (value < min) {
      setAmount(min)
      return
    }
    if (value <= max) {
      setAmount(value)
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
