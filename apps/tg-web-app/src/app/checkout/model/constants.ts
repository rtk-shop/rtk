export const providerNames = {
  novaPoshta: 'nova_poshta'
} as const

export const pupularCitiesNames = ['Харків', 'Київ', 'Одеса', 'Дніпро', 'Львів']

export const warehouseTypeLocale: { [key: number]: string } = {
  1: 'warehouse',
  2: 'cargoWarehouse',
  3: 'parcelAutomat'
} as const

export const novaDeliveryTypeOptions = [
  {
    label: warehouseTypeLocale[1],
    value: '1',
    disabled: false
  },
  {
    label: warehouseTypeLocale[2],
    value: '2',
    disabled: false
  },
  {
    label: warehouseTypeLocale[3],
    value: '3',
    disabled: false
  }
]
