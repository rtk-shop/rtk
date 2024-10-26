import { gql } from '@urql/next'

export const catalog_products = gql`
  query Products(
    $gender: [Gender!]
    $isHidden: Boolean = false
    $instock: Boolean
    $tag: ProductTag
    $price: PriceRange
    $category: [CategoryType!]
    $page: Int!
  ) {
    products(
      filter: {
        gender: $gender
        isHidden: $isHidden
        instock: $instock
        tag: $tag
        price: $price
        category: $category
        page: $page
      }
    ) {
      priceRange {
        gt
        lt
      }
      pagination {
        totalPages
        currentPage
      }
      products {
        id
        slug
        title
        inStock
        currentPrice
        basePrice
        tag
        preview
      }
    }
  }
`
