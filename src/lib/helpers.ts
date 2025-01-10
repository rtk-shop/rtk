import type { OrderStatus } from '@/types/order'

export const formatPrice = (num: number): string => {
  let dst: string

  if (Number.isInteger(num)) {
    dst = num.toString()
  } else {
    dst = num.toFixed(2)
  }

  return dst.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

/**
 * @param src is a date-time string in RFC 3339 format
 * @param options is a Intl.DateTimeFormatOptions instance,
 * for example: { dateStyle: 'short', timeStyle: 'medium' }
 */
export const formatDate = (src: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    return new Intl.DateTimeFormat('uk-UA', { ...options }).format(new Date(src.slice(0, -1))) // remove "Z"
  } catch (error) {
    console.log(error)
    return 'invalid date'
  }
}

export const formatPhoneNumber = (phone: string): string => {
  return '0' + phone.replace(/(\d{2})(\d{3})(\d{4})/g, '$1-$2-$3')
}

export const getColorByTagName = (name: string): string => {
  switch (name) {
    case 'new':
      return '#32CD32'
    case 'best price':
      return '#FFA500'
    default:
      return 'lightgray'
  }
}

// todo: add types
export const getProductMainTagColor = (name: string): string => {
  switch (name) {
    case 'new':
      return '#6EBE90'
    case 'top':
      return '#a3f271'
    case 'stock':
      return '#fd3b3b'
    default:
      return 'lightgray'
  }
}

export const getOrderStatusColor = (status: keyof typeof OrderStatus): string => {
  const cond = status as Lowercase<keyof typeof OrderStatus>

  switch (cond) {
    case 'done':
      return '#0d840d'
    case 'returned':
      return '#a2a2a2'
    default:
      return ''
  }
}
