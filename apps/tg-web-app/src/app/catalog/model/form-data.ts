import { availability } from './types'
import { ProductFilterSortBy, Gender, CategoryType, ProductTag } from '@/lib/api/graphql/types'

export type Option<T> = {
  label: string
  value: T
  disabled?: boolean
}

export const genderOptionsData: Option<Gender>[] = [
  {
    label: 'gender.female',
    value: Gender.Female
  },
  {
    label: 'gender.male',
    value: Gender.Male
  },
  {
    label: 'gender.unisex',
    value: Gender.Unisex
  }
]

export const availabilityOptionsData: Option<availability>[] = [
  {
    label: 'nouns.inStock',
    value: 'inStock'
  },
  {
    label: 'nouns.outStock',
    value: 'byOrder'
  }
]

export const tagsOptionsData: Option<ProductTag>[] = [
  {
    label: 'nouns.top',
    value: ProductTag.Top,
    disabled: false
  },
  {
    label: 'nouns.new',
    value: ProductTag.New,
    disabled: false
  },
  {
    label: 'nouns.withDiscount',
    value: ProductTag.Stock,
    disabled: false
  }
]

export const categoriesOptionsData: Option<CategoryType>[] = [
  {
    label: 'categories.suitcase',
    value: CategoryType.Suitcase
  },
  {
    label: 'categories.bag',
    value: CategoryType.Bag
  },
  {
    label: 'categories.backpack',
    value: CategoryType.Backpack
  },
  {
    label: 'categories.other',
    value: CategoryType.Other
  }
]

export const sortOptionsData: Option<ProductFilterSortBy>[] = [
  {
    label: 'adjectives.standard',
    value: ProductFilterSortBy.Default
  },
  {
    label: 'actions.priceASC',
    value: ProductFilterSortBy.PriceAsc
  },
  {
    label: 'actions.priceDESC',
    value: ProductFilterSortBy.PriceDesc
  }
]
