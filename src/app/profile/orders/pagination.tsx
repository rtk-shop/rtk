import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

const navButton = cva(
  'flex items-center rounded-lg bg-gray-200 px-3.5 py-1 leading-7 text-black select-none disabled:bg-gray-100 disabled:text-gray-400',
  {
    variants: {
      direction: {
        prev: 'mr-1',
        next: ''
      }
    }
  }
)

const arrowIcon = cva('text-[22px]', {
  variants: {
    direction: {
      prev: '-rotate-90',
      next: 'rotate-90'
    }
  }
})

export interface PaginationProps {
  pageInfo?: {
    hasNextPage: boolean
    startCursor?: string | null
    endCursor?: string | null
    hasPreviousPage: boolean
  }
  onNextPage(): void
  onPrevPage(): void
}

export function Pagination({ pageInfo, onPrevPage, onNextPage }: PaginationProps) {
  return (
    <Box flex="row" align="center" justify="center">
      <button
        type="button"
        disabled={!pageInfo?.hasPreviousPage}
        onClick={onPrevPage}
        className={navButton({ direction: 'prev' })}
      >
        <Icon name="common/arrow" className={arrowIcon({ direction: 'prev' })} />
      </button>
      {/*  */}
      <button
        type="button"
        disabled={!pageInfo?.hasNextPage}
        onClick={onNextPage}
        className={navButton({ direction: 'next' })}
      >
        <Icon name="common/arrow" className={arrowIcon({ direction: 'next' })} />
      </button>
    </Box>
  )
}
