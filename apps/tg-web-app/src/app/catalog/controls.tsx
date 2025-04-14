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
      <div className="flex">
        <Badge content={isSortDirty} className="w-full pr-0.5" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            fullWidth
            onClick={onSortClick}
            className="bg-gray-200 !px-1 !py-2"
            endIcon={<Icon name="action/sort" className="text-[25px]" />}
          >
            Сортировать
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
            Фильтр
          </Button>
        </Badge>
      </div>
    </section>
  )
}
