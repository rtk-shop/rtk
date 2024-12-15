import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

export interface PaginationProps {
  hasNextPage: boolean | undefined
  hasPreviousPage: boolean | undefined
  startCursor?: string
  endCursor?: string | null
  onNext(): void
  onPrev(): void
}

const navButton = cva('flex select-none items-center rounded-lg bg-gray-100 px-3 py-1 leading-7', {
  variants: {
    visible: {
      true: 'visible',
      false: 'invisible'
    }
  }
})

const arrowIcon = cva('fill-black text-[27px]', {
  variants: {
    direction: {
      left: '-rotate-90',
      right: 'rotate-90'
    }
  }
})

export function Pagination({ hasPreviousPage, hasNextPage, onNext, onPrev }: PaginationProps) {
  const handleNextClick = () => {
    if (hasNextPage) onNext()
  }

  const handlePrevClick = () => {
    if (hasPreviousPage) onPrev()
  }

  return (
    <div className="flex items-center justify-between">
      <button onClick={handlePrevClick} className={navButton({ visible: hasPreviousPage })}>
        <Icon name="common/arrow" className={arrowIcon({ direction: 'left' })} />
        <span>Назад</span>
      </button>
      {/*  */}
      <button onClick={handleNextClick} className={navButton({ visible: hasNextPage })}>
        <span>Следующая страница</span>
        <Icon name="common/arrow" className={arrowIcon({ direction: 'right' })} />
      </button>
    </div>
  )
}
