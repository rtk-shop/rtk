export function validateStartParam(input: string): boolean {
  const regex = /^[\w-]{0,512}$/
  return regex.test(input)
}

export const startupCommandsPatterns = {
  product: 'product_'
} as const
