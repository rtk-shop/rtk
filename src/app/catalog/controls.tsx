import { Box } from '@/components/ui/box'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useFormContext } from 'react-hook-form'
import { countFiltersDirtyFields } from './model/helpers'
import { useTranslations } from 'next-intl'
import type { FormValues } from './model/types'

export function Controls({
  onSortClick,
  onFiltersClick
}: {
  onFiltersClick(): void
  onSortClick(): void
}) {
  const t = useTranslations('Common')

  const {
    formState: { dirtyFields }
  } = useFormContext<FormValues>()

  const isSortDirty = +!!dirtyFields.sortBy
  const filtersDirtyCount = countFiltersDirtyFields(dirtyFields)

  return (
    <Box as="section" className="py-3">
      <Box flex="row">
        <Badge content={isSortDirty} className="w-full pr-0.5" dotClassName="right-3 top-1">
          <Button color="secondary" fullWidth onClick={onSortClick}>
            <Icon name="action/arrow-down-up" className="mr-1 text-lg" />
            {t('actions.sort')}
          </Button>
        </Badge>
        <Badge content={filtersDirtyCount} className="w-full pl-0.5" dotClassName="right-3 top-1">
          <Button color="secondary" fullWidth onClick={onFiltersClick}>
            <Icon name="action/funnel" className="mr-1 text-lg" />
            {t('nouns.filter')}
          </Button>
        </Badge>
      </Box>
    </Box>
  )
}
