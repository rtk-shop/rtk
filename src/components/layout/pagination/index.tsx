import { cva } from 'cva'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import type { PageInfo } from '@/types/pagination'

export interface PaginationProps {
  pageInfo?: PageInfo
  onNextPage(): void
  onPrevPage(): void
}

const navButton = cva('', {
  variants: {
    visible: {
      true: 'visible',
      false: 'invisible'
    }
  }
})

export function Pagination({ pageInfo, onNextPage, onPrevPage }: PaginationProps) {
  const handleNextClick = () => {
    if (pageInfo?.hasNextPage) onNextPage()
  }

  const handlePrevClick = () => {
    if (pageInfo?.hasPreviousPage) onPrevPage()
  }

  return (
    <Box flex="row" align="center" justify="between">
      <Button
        color="ghost"
        onClick={handlePrevClick}
        className={navButton({ visible: pageInfo?.hasPreviousPage })}
      >
        <Icon name="common/arrow" className="-rotate-90 text-[23px]" />
        Попередня сторінка
      </Button>
      {/*  */}
      <Button
        color="ghost"
        onClick={handleNextClick}
        className={navButton({ visible: pageInfo?.hasNextPage })}
      >
        Наступна сторінка
        <Icon name="common/arrow" className="rotate-90 text-[23px]" />
      </Button>
    </Box>
  )
}
