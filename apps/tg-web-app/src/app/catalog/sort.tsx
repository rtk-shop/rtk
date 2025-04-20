import { Drawer } from '@/components/ui/drawer'
import { RadioGroup } from '@/components/ui/radio-group'
import { IconButton } from '@/components/ui/icon-button'
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
      <section className="relative h-[470px] rounded-t-2xl bg-white px-4 pb-4">
        <p className="py-4 text-[21px] font-semibold">{t('nouns.sort')}</p>
        <div className="absolute top-3 right-3">
          <IconButton onClick={onSortClose} className="text-sm text-black">
            <Icon name="common/xmark" />
          </IconButton>
        </div>
        <div className="mb-5 h-0.5 bg-gray-100" />
        <RadioGroup name="sortBy" options={sortOptionsData.map(addI18)} />
      </section>
    </Drawer>
  )
}
