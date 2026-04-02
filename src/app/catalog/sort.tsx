import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { RadioGroup } from '@/components/ui/radio-group'
import { Icon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import { type Option, sortOptionsData } from './model/form-data'

export function SortMenu({ open, onSortClose }: { open: boolean; onSortClose(): void }) {
  const t = useTranslations('Common')

  function addI18<T>(option: Option<T>) {
    return {
      ...option,
      label: t(option.label)
    }
  }

  return (
    <Drawer open={open} position="bottom" onClose={onSortClose}>
      <Box as="section" className="relative h-117.5 rounded-t-2xl bg-white px-4 pb-4">
        <p className="py-4 text-[21px] font-medium">{t('nouns.sort')}</p>
        <Box className="absolute top-2.5 right-3">
          <Button color="ghost" onClick={onSortClose} className="bg-transparent">
            <Icon name="common/x" className="text-2xl text-black" />
          </Button>
        </Box>
        <div className="mb-5 h-0.5 bg-gray-100" />
        <RadioGroup name="sortBy" options={sortOptionsData.map(addI18)} />
      </Box>
    </Drawer>
  )
}
