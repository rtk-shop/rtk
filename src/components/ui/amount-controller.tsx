import { Box } from './box'
import { Button } from './button'
import { Icon } from './icon'
import { Loader } from '@/components/ui/loader'

export interface AmountControllerProps {
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
}: AmountControllerProps) {
  const handleAddClick = (): void => {
    if (amount >= Number(max)) return
    onChange('add', amount + 1)
  }

  const handleSubClick = (): void => {
    if (amount <= min) return
    onChange('sub', amount - 1)
  }

  return (
    <Box flex="row" align="center" className="rounded-lg bg-gray-100">
      <Button
        hapticFeedback="soft"
        color="ghost"
        onClick={handleSubClick}
        disabled={loading || amount <= 1}
        className="text-[25px] text-black active:not-disabled:scale-110"
      >
        <Icon name="action/circle-minus" />
      </Button>

      <Box className="w-7 text-center text-lg font-medium select-none">
        {loading ? (
          <Box flex="row" justify="center">
            <Loader size="xs" />
          </Box>
        ) : (
          <span>{amount}</span>
        )}
      </Box>
      <Button
        hapticFeedback="soft"
        color="ghost"
        onClick={handleAddClick}
        disabled={loading || (!!max && amount >= max)}
        className="text-[25px] text-black active:not-disabled:scale-110"
      >
        <Icon name="action/circle-plus" />
      </Button>
    </Box>
  )
}
