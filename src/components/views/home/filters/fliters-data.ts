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
      label: 'filters.gender.female',
      value: 'female'
    },
    {
      label: 'filters.gender.male',
      value: 'male'
    },
    {
      label: 'filters.gender.unisex',
      value: 'unisex'
    }
  ]
}

const availability: FilterSection = {
  options: [
    {
      label: 'filters.availability.inStock',
      value: 'inStock'
    },
    {
      label: 'filters.availability.byOrder',
      value: 'byOrder'
    }
  ]
}

const tags: FilterSection = {
  options: [
    {
      label: 'filters.tag.top',
      value: 'top',
      disabled: false
    },
    {
      label: 'filters.tag.new',
      value: 'new',
      disabled: false
    },
    {
      label: 'filters.tag.discounts',
      value: 'stock',
      disabled: false
    }
  ]
}

const categories: FilterSection = {
  options: [
    {
      label: 'common:categories.suitcases',
      value: 'suitcase'
    },
    {
      label: 'common:categories.bags',
      value: 'bag'
    },
    {
      label: 'common:categories.wallets',
      value: 'wallet'
    },
    {
      label: 'common:categories.backpacks',
      value: 'backpack'
    },
    {
      label: 'common:categories.other',
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
