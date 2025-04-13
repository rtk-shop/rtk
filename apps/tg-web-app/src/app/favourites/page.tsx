import { Icon } from '@/components/ui/icon'
import { Products } from './product-list'

export default function Favourites() {
  return (
    <div className="mb-12 h-dvh px-2 pt-5">
      <h1 className="text-2xl leading-0 font-medium">
        Понравившиеся товары <Icon name="common/heart" className="text-red-600" />
      </h1>
      <div className="h-full pt-4">
        <Products />
      </div>
    </div>
  )
}
