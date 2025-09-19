import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

export interface PaginationProps {
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  startCursor?: string
  endCursor?: string | null
  onNextPage(): void
  onPrevPage(): void
}

const navButton = cva('flex items-center rounded-lg bg-gray-100 px-3 py-1 leading-7 select-none', {
  variants: {
    visible: {
      true: 'visible',
      false: 'invisible'
    }
  }
})

const arrowIcon = cva('fill-black text-[27px] font-medium', {
  variants: {
    direction: {
      left: '-rotate-90',
      right: 'rotate-90'
    }
  }
})

export function Pagination({
  hasPreviousPage,
  hasNextPage,
  onNextPage,
  onPrevPage
}: PaginationProps) {
  const handleNextClick = () => {
    if (hasNextPage) onNextPage()
  }

  const handlePrevClick = () => {
    if (hasPreviousPage) onPrevPage()
  }

  return (
    <div className="flex items-center justify-between">
      <button onClick={handlePrevClick} className={navButton({ visible: hasPreviousPage })}>
        <Icon name="common/arrow" className={arrowIcon({ direction: 'left' })} />
        <span>Назад</span>
      </button>
      {/*  */}
      <button onClick={handleNextClick} className={navButton({ visible: hasNextPage })}>
        <span>Дальше</span>
        <Icon name="common/arrow" className={arrowIcon({ direction: 'right' })} />
      </button>
    </div>
  )
}
