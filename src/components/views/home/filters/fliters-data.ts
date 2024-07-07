export interface FilterItem {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterSection {
  options: FilterItem[]
}

const gender: FilterSection = {
  options: [
    {
      label: 'catalog:filters.gender.female',
      value: 'female'
    },
    {
      label: 'catalog:filters.gender.male',
      value: 'male'
    },
    {
      label: 'catalog:filters.gender.unisex',
      value: 'unisex'
    }
  ]
}

const availability: FilterSection = {
  options: [
    {
      label: 'catalog:filters.availability.inStock',
      value: 'inStock'
    },
    {
      label: 'catalog:filters.availability.byOrder',
      value: 'byOrder'
    }
  ]
}

const tags: FilterSection = {
  options: [
    {
      label: 'Топ', //'catalog:filters.tag.all',
      value: 'top',
      disabled: false
    },
    {
      label: 'catalog:filters.tag.new',
      value: 'new',
      disabled: false
    },
    {
      label: 'catalog:filters.tag.discounts',
      value: 'stock',
      disabled: false
    }
  ]
}

const categories: FilterSection = {
  options: [
    {
      label: 'catalog:filters.categories.suitcases',
      value: 'suitcase'
    },
    {
      label: 'catalog:filters.categories.bags',
      value: 'bag'
    },
    {
      label: 'catalog:filters.categories.wallets',
      value: 'wallet'
    },
    {
      label: 'catalog:filters.categories.backpack',
      value: 'backpack'
    },
    {
      label: 'catalog:filters.categories.other',
      value: 'other'
    }
  ]
}

const data = {
  gender,
  availability,
  tags,
  categories
}

export default data
