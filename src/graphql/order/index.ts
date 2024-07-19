import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $name: String!
    $surname: String!
    $email: String!
    $phone: String!
    $cityId: String!
    $postOfficeId: String!
    $cartItems: [CartItem!]!
    $supplier: String!
  ) {
    cartItems @client @export(as: "cartItems")
    createOrder(
      input: {
        name: $name
        surname: $surname
        email: $email
        phone: $phone
        cityId: $cityId
        postOfficeId: $postOfficeId
        cartItems: $cartItems
        supplier: $supplier
      }
    ) {
      message
    }
  }
`
