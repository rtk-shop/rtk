import { CategoryType } from '@/lib/api/graphql/types'

type OrderProduct = {
  id: string
  quantity: number
  priceAtOrder: number
  product: { id: string; title: string; preview: string; category: CategoryType }
}

const categoryCost = {
  [CategoryType.Suitcase]: 240,
  [CategoryType.Backpack]: 120,
  [CategoryType.Bag]: 120,
  [CategoryType.Other]: 120
} as const

export const calculateDeliveryCost = (products: Array<OrderProduct>): number => {
  return products.reduce((acc, { quantity, product }) => {
    const category = product.category

    let cost = categoryCost[category]

    switch (category) {
      case CategoryType.Suitcase:
        cost *= quantity
        return acc + cost
      case CategoryType.Backpack:
        if (quantity > 3) {
          cost *= quantity
          return acc + cost
        }
      case CategoryType.Bag:
        if (quantity > 3) {
          cost *= quantity
          return acc + cost
        }
      default:
        break
    }

    return acc
  }, 0)
}
