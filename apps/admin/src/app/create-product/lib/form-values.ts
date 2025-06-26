import { SelectOption } from '@/components/ui/select'
import { productGender, productCategory, productTag } from '@/lib/constants'

export const genderOptions: SelectOption[] = [
  {
    title: 'Женский',
    value: productGender.female
  },
  {
    title: 'Мужской',
    value: productGender.male
  },
  {
    title: 'Унисекс',
    value: productGender.unisex
  }
]

export const categoryOptions: SelectOption[] = [
  {
    title: 'Чемоданы',
    value: productCategory.suitcase
  },
  {
    title: 'Рюкзаки',
    value: productCategory.backpack
  },
  {
    title: 'Сумки',
    value: productCategory.bag
  },
  {
    title: 'Другое',
    value: productCategory.other
  }
]

export const tagOptions: SelectOption[] = [
  {
    title: 'Новинка',
    value: productTag.new
  },
  {
    title: 'Топ',
    value: productTag.top
  },
  {
    title: 'Акция',
    value: productTag.stock
  }
]
