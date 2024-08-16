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
 */
export const formatDate = (src: string, options?: Intl.DateTimeFormatOptions): string => {
  const initOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
    timeStyle: 'medium'
  }
  try {
    return new Intl.DateTimeFormat('uk-UA', { ...initOptions, ...options }).format(
      new Date(src.slice(0, -1))
    )
  } catch (error) {
    console.log(error)
    return 'invalid date'
  }
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
