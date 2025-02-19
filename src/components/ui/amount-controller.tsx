import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Loader } from './loader'

interface AddSubInputProps {
  amount: number
  min: number
  max?: number
  loading?: boolean
  onChange(type: 'add' | 'sub', n: number): void
}

export function AmountController({
  min,
  max,
  amount,
  onChange,
  loading = false
}: AddSubInputProps) {
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
        hapticFeedback="soft"
        onClick={handleSubClick}
        disabled={loading || amount <= 1}
        aria-label="удалить одну единицу данного продукта"
        className="p-2! text-[25px] text-gray-500! active:not-disabled:scale-110"
      >
        <Icon name="action/circle-minus" />
      </IconButton>

      <div className="w-7 text-center text-lg font-medium select-none">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-4">
              <Loader adaptive color="dark" />
            </div>
          </div>
        ) : (
          <span>{amount}</span>
        )}
      </div>
      <IconButton
        hapticFeedback="soft"
        onClick={handleAddClick}
        disabled={loading || (!!max && amount >= max)}
        aria-label="добавить одну единицу данного продукта"
        className="p-2! text-[25px] text-gray-500! active:not-disabled:scale-110"
      >
        <Icon name="action/circle-plus" />
      </IconButton>
    </div>
  )
}
