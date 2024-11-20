import { Icon } from './icon'
import { IconButton } from './icon-button'

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
    <div className="flex items-center rounded-lg bg-gray-100">
      <IconButton
        disableRipple
        onClick={handleSubClick}
        disabled={amount <= 1}
        aria-label="удалить одну единицу данного продукта"
        className="!p-2 text-[25px] !text-gray-500 active:scale-110"
      >
        <Icon name="action/circle-minus" />
      </IconButton>
      <div className="w-7 select-none text-center text-[18px] font-medium">
        <span>{amount}</span>
      </div>
      <IconButton
        disableRipple
        onClick={handleAddClick}
        disabled={!!max && amount >= max}
        aria-label="добавить одну единицу данного продукта"
        className="!p-2 text-[25px] !text-gray-500 active:scale-110"
      >
        <Icon name="action/circle-plus" />
      </IconButton>
    </div>
  )
}
