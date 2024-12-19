import { Drawer } from '@/components/ui/drawer'
import { RadioGroup } from '@/components/ui/radio-group'
import { sortOptionsData } from './model/form-data'

export function SortMenu({ open, onSortClose }: { open: boolean; onSortClose(): void }) {
  return (
    <Drawer open={open} position="bottom" onClose={onSortClose}>
      <section className="h-[470px] rounded-t-2xl bg-white p-4">
        <p className="text-[21px] font-semibold">Сортировка</p>
        <div className="mb-2.5 h-0.5 bg-gray-200" />
        <RadioGroup name="sortBy" options={sortOptionsData} />
      </section>
    </Drawer>
  )
}
