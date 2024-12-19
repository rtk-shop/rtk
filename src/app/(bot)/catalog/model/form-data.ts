import type { Gender, ProductTag, Category } from '@/types'
import { FormValues } from './types'

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
    value: 'SUITCASE'
  },
  {
    label: 'categories.bags',
    value: 'BAG'
  },
  {
    label: 'categories.wallets',
    value: 'WALLET'
  },
  {
    label: 'categories.backpacks',
    value: 'BACKPACK'
  },
  {
    label: 'categories.other',
    value: 'OTHER'
  }
]

// Sort

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
