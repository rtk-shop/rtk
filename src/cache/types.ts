export type FavouriteProductsCacheQuery = {
  __typename?: 'Query'
  userFavouriteProducts: Array<{
    __typename: 'Product'
    id: string
  }>
}
