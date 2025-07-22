import { CategoryType, Gender, ProductTag } from '@/lib/api/graphql/types'

export type Option<T> = {
  title: string
  value: T
}

export const genderOptions: Option<Gender>[] = [
  {
    title: 'Женский',
    value: Gender.Female
  },
  {
    title: 'Мужской',
    value: Gender.Male
  },
  {
    title: 'Унисекс',
    value: Gender.Unisex
  }
]

export const categoryOptions: Option<CategoryType>[] = [
  {
    title: 'Чемоданы',
    value: CategoryType.Suitcase
  },
  {
    title: 'Рюкзаки',
    value: CategoryType.Backpack
  },
  {
    title: 'Сумки',
    value: CategoryType.Bag
  },
  {
    title: 'Другое',
    value: CategoryType.Other
  }
]

export const tagOptions: Option<ProductTag>[] = [
  {
    title: 'Новинка',
    value: ProductTag.New
  },
  {
    title: 'Топ',
    value: ProductTag.Top
  },
  {
    title: 'Акция',
    value: ProductTag.Stock
  }
]
