export type NewCartItem = {
  productId: string
  amount: number
  price: number
}

export type CartItem = NewCartItem & {
  __typename: string
  id: string
}

export type CartItemsRespone = {
  cartItems: CartItem[]
}
