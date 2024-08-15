// export * from './cart'
export * from './product'
export * from './auth'
// export * from './types'

export type cartItem = {
  id: string
  slug: string
  title: string
  currentPrice: number
  preview: string
}
