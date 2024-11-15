export const providerNames = {
  novaPoshta: 'nova_poshta'
} as const

export const pupularCitiesNames = ['Харків', 'Київ', 'Одеса', 'Дніпро', 'Львів']

export const novaDeliveryTypeOptions = [
  {
    label: 'В отделение',
    value: 'department',
    disabled: false
  },
  {
    label: 'В почтомат',
    value: 'poshtomat',
    disabled: false
  },
  {
    label: 'Курьером',
    value: 'courier',
    disabled: true
  }
]
