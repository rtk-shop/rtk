import { gql } from '@apollo/client'

const itemLayout = `
  id
  productId
  amount
  price
`

const queryLayout = `
  cartItems {
    ${itemLayout}
  }   
`

export const writeCartItemsGQL = gql`
  query WriteCartItems {
    ${queryLayout}
  }
`

export const getCartItemGQL = gql`
  fragment Current on CartItem {
    ${itemLayout}
  }
`

export const addNewItemGQL = gql`
  query AddCartItem($id: ID!) {
    cartItems(id: $id) {
      ${itemLayout}
    }
  }
`

export const READ_CART_ITEMS = gql`
  query GetCartItems {
    ${queryLayout}
  }
`
