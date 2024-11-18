export const providerNames = {
  novaPoshta: 'nova_poshta'
} as const

export const pupularCitiesNames = ['Харків', 'Київ', 'Одеса', 'Дніпро', 'Львів']

export const novaDeliveryTypeOptions = [
  {
    label: 'Отделение',
    value: 'department',
    disabled: false
  },
  {
    label: 'Грузовое отделение',
    value: 'poshtomat',
    disabled: false
  },
  {
    label: 'Почтомат',
    value: 'courier',
    disabled: false
  }
]
