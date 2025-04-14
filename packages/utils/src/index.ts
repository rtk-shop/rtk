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
