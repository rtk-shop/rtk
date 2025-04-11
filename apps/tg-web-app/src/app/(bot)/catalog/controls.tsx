import { Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { Icon } from '@/components/ui/icon'
import { useFormContext } from 'react-hook-form'
import { countFiltersDirtyFields } from './model/helpers'
import type { FormValues } from './model/types'

export interface ControlsProps {
  onFiltersClick(): void
  onSortClick(): void
}

export function Controls({ onSortClick, onFiltersClick }: ControlsProps) {
  const {
    formState: { dirtyFields }
  } = useFormContext<FormValues>()

  const isSortDirty = +!!dirtyFields.sortBy
  const filtersDirtyCount = countFiltersDirtyFields(dirtyFields)

  return (
    <section className="py-3">
      <div className="flex justify-between">
        <Badge content={isSortDirty} className="mr-1 w-full" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            onClick={onSortClick}
            fullWidth
            className="bg-gray-200 pt-2 pb-2"
            endIcon={<Icon name="action/sort" className="ml-1.5 text-[25px]" />}
          >
            Сортировать
          </Button>
        </Badge>
        <Badge content={filtersDirtyCount} className="w-full" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            onClick={onFiltersClick}
            fullWidth
            className="bg-gray-200 pt-2 pb-2"
            startIcon={<Icon name="action/filter" className="mr-1.5" />}
          >
            Фильтр
          </Button>
        </Badge>
      </div>
    </section>
  )
}
