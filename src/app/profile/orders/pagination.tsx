import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import type { PageInfo } from '@/types/pagination'

export function Pagination({
  pageInfo,
  onPrevPage,
  onNextPage
}: {
  pageInfo?: PageInfo
  onNextPage(): void
  onPrevPage(): void
}) {
  return (
    <Box flex="row" align="center" justify="center">
      <Button
        color="secondary"
        size="sm"
        hapticFeedback="light"
        disabled={!pageInfo?.hasPreviousPage}
        onClick={onPrevPage}
        className="mr-1 w-14!"
      >
        <Icon name="common/arrow" className="-rotate-90 text-[23px]" />
      </Button>
      <Button
        color="secondary"
        size="sm"
        hapticFeedback="light"
        disabled={!pageInfo?.hasNextPage}
        onClick={onNextPage}
        className="w-14!"
      >
        <Icon name="common/arrow" className="rotate-90 text-[23px]" />
      </Button>
    </Box>
  )
}
