import { cva } from 'cva'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFormContext } from 'react-hook-form'
import { SvgIcon } from '@/components/ui/svg-icon'
import FilterIcon from '../../../../../public/icons/filter.svg'
import SortIcon from '../../../../../public/icons/sort.svg'

interface ControlsProps {
  onFilterClick(): void
}

const control = cva('w-full rounded-lg bg-gray-light !p-2 text-[15px] font-semibold', {
  variants: {
    type: {
      sort: 'rounded-br-none rounded-tr-none lg:max-w-48 lg:rounded-lg',
      filters: 'rounded-bl-none rounded-tl-none border-l border-l-gray-300'
    }
  }
})

export function Controls({ onFilterClick }: ControlsProps) {
  const {
    formState: { dirtyFields }
  } = useFormContext()

  return (
    <div className="mb-2.5 flex justify-center px-1 lg:mb-0 lg:justify-end lg:px-2.5">
      <Button
        color="secondary"
        className={control({ type: 'sort' })}
        startIcon={
          <SvgIcon className="mr-2.5 text-[27px]">
            <SortIcon />
          </SvgIcon>
        }
      >
        По умолчанию
      </Button>
      <Badge
        content={Object.keys(dirtyFields).length}
        className="basis-1/2 lg:hidden"
        dotClassName="right-1"
      >
        <Button
          color="secondary"
          onClick={onFilterClick}
          className={control({ type: 'filters' })}
          startIcon={
            <SvgIcon className="mr-2.5">
              <FilterIcon />
            </SvgIcon>
          }
        >
          Фильтр
        </Button>
      </Badge>
    </div>
  )
}
