import type { Gender, ProductTag, Category } from '@/types'
import { FormValues } from './types'
import { category } from '@/lib/constants'

export type Option<T> = {
  label: string
  value: T
  disabled?: boolean
}

export const genderOptionsData: Option<keyof typeof Gender>[] = [
  {
    label: 'actions.forFemale',
    value: 'FEMALE'
  },
  {
    label: 'actions.forMale',
    value: 'MALE'
  },
  {
    label: 'nouns.unisex',
    value: 'UNISEX'
  }
]

// todo: better values
export const availabilityOptionsData: Option<'inStock' | 'byOrder'>[] = [
  {
    label: 'nouns.inStock',
    value: 'inStock'
  },
  {
    label: 'nouns.outStock',
    value: 'byOrder'
  }
]

export const tagsOptionsData: Option<keyof typeof ProductTag>[] = [
  {
    label: 'nouns.top',
    value: 'TOP',
    disabled: false
  },
  {
    label: 'nouns.new',
    value: 'NEW',
    disabled: false
  },
  {
    label: 'nouns.withDiscount',
    value: 'STOCK',
    disabled: false
  }
]

export const categoriesOptionsData: Option<keyof typeof Category>[] = [
  {
    label: 'categories.suitcases',
    value: category.suitcase
  },
  {
    label: 'categories.bags',
    value: category.bag
  },
  {
    label: 'categories.backpacks',
    value: category.backpack
  },
  {
    label: 'categories.other',
    value: category.other
  }
]

export const sortOptionsData: Option<FormValues['sortBy']>[] = [
  {
    label: 'Стандартно',
    value: 'default'
  },
  {
    label: 'По возростанию цены',
    value: 'priceAsc'
  },
  {
    label: 'По убыванию цены',
    value: 'priceDesc'
  }
]
