import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useFormContext } from 'react-hook-form'

export interface ControlsProps {
  onFiltersClick(): void
}

export function Controls({ onFiltersClick }: ControlsProps) {
  const {
    formState: { isDirty }
  } = useFormContext()

  return (
    <section className="py-3">
      <div className="flex justify-between">
        <Badge content={0} className="mr-1 w-full" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            fullWidth
            className="bg-gray-200 pb-2 pt-2"
            endIcon={<Icon name="action/sort" className="ml-1.5 text-[25px]" />}
          >
            Сортировать
          </Button>
        </Badge>
        <Badge content={+isDirty} className="w-full" dotClassName="right-3 top-1">
          <Button
            color="secondary"
            onClick={onFiltersClick}
            fullWidth
            className="bg-gray-200 pb-2 pt-2"
            startIcon={<Icon name="action/filter" className="mr-1.5" />}
          >
            Фильтр
          </Button>
        </Badge>
      </div>
    </section>
  )
}
