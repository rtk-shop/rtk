import { SvgIcon } from '../svg-icon'
import { IconButton } from '../icon-button'
import PlusIcon from '../../../../public/icons/plus.svg'
import MinusIcon from '../../../../public/icons/minus.svg'

import styles from './styles.module.scss'

interface AddSubInputProps {
  amount: number
  min: number
  max?: number
  onChange(type: 'add' | 'sub', n: number): void
}

export function AmountController({ min, max, amount, onChange }: AddSubInputProps) {
  const handleAddClick = (): void => {
    if (amount >= Number(max)) return
    onChange('add', amount + 1)
  }

  const handleSubClick = (): void => {
    if (amount <= min) return
    onChange('sub', amount - 1)
  }

  return (
    <div className={styles.container}>
      <IconButton
        disableRipple
        onClick={handleSubClick}
        disabled={amount <= 1}
        aria-label="удалить одну единицу данного продукта"
        className={styles.button}
      >
        <SvgIcon className={styles.icon}>
          <MinusIcon />
        </SvgIcon>
      </IconButton>
      <div className={styles.counter}>
        <span>{amount}</span>
      </div>
      <IconButton
        disableRipple
        onClick={handleAddClick}
        disabled={!!max && amount >= max}
        aria-label="добавить одну единицу данного продукта"
        className={styles.button}
      >
        <SvgIcon className={styles.icon}>
          <PlusIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
