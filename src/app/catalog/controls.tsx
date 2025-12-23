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
    <section className="py-3">
      <div className="flex">
        <Badge content={isSortDirty} className="w-full pr-0.5" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            fullWidth
            onClick={onSortClick}
            className="bg-gray-200 !px-1 !py-2"
            endIcon={<Icon name="action/sort" className="text-[25px]" />}
          >
            {t('actions.sort')}
          </Button>
        </Badge>
        <Badge content={filtersDirtyCount} className="w-full pl-0.5" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            fullWidth
            onClick={onFiltersClick}
            className="bg-gray-200 !px-1 !py-2"
            startIcon={<Icon name="action/filter" className="mr-1" />}
          >
            {t('nouns.filter')}
          </Button>
        </Badge>
      </div>
    </section>
  )
}
