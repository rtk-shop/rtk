import { orderStatus } from '@/lib/constants'
import type { FacetedFilterOption } from './faceted-filter'

export const statuses: FacetedFilterOption[] = [
  {
    label: 'Создан',
    value: orderStatus.created
  },
  {
    label: 'В обработке',
    value: orderStatus.processed
  },
  {
    label: 'В дороге',
    value: orderStatus.sent
  },
  {
    label: 'Получен',
    value: orderStatus.done
  },
  {
    label: 'Отменен',
    value: orderStatus.rejected
  },
  {
    label: 'Возврат',
    value: orderStatus.returned
  }
]
