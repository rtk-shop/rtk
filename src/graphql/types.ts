export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Date: { input: any; output: any }
  Upload: { input: any; output: any }
}

export type AttachedRating = {
  __typename?: 'AttachedRating'
  rating: Scalars['Float']['output']
}

export type CartItem = {
  amount: Scalars['Int']['input']
  productId: Scalars['String']['input']
}

export type CartItemType = {
  __typename?: 'CartItemType'
  amount: Scalars['Int']['output']
  id: Scalars['String']['output']
}

export const enum CategoryType {
  Backpack = 'backpack',
  Bag = 'bag',
  Other = 'other',
  Suitcase = 'suitcase',
  Wallet = 'wallet'
}

export type DeleteProductResponse = {
  __typename?: 'DeleteProductResponse'
  message: Scalars['String']['output']
}

export const enum Gender {
  Female = 'female',
  Male = 'male',
  Unisex = 'unisex'
}

export type HideProductResponse = {
  __typename?: 'HideProductResponse'
  isHidden: Scalars['Boolean']['output']
}

export type HomeDataResponse = {
  __typename?: 'HomeDataResponse'
  featuredProducts: Array<Product>
  sliderData: Array<HomeMainSlide>
}

export type HomeMainSlide = {
  __typename?: 'HomeMainSlide'
  actionURL: Scalars['String']['output']
  color: Scalars['String']['output']
  imageURL: Scalars['String']['output']
}

export type LogInInput = {
  keyWord: Scalars['String']['input']
}

export type LogInRsponse = {
  __typename?: 'LogInRsponse'
  token: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  createOrder?: Maybe<NewOrderResponse>
  deleteProduct?: Maybe<DeleteProductResponse>
  hideProduct?: Maybe<HideProductResponse>
  productRatingVote?: Maybe<ProductRatingVoteResponse>
}

export type MutationCreateOrderArgs = {
  input: NewOrderInput
}

export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input']
}

export type MutationHideProductArgs = {
  id: Scalars['ID']['input']
  isHidden: Scalars['Boolean']['input']
}

export type MutationProductRatingVoteArgs = {
  input: ProductRatingVoteInput
}

export type NewOrderInput = {
  cartItems: Array<CartItem>
  cityId: Scalars['String']['input']
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  phone: Scalars['String']['input']
  postOfficeId: Scalars['String']['input']
  supplier: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type NewOrderResponse = {
  __typename?: 'NewOrderResponse'
  message: Scalars['String']['output']
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']['output']
}

export type Order = {
  __typename?: 'Order'
  cartItems: Array<CartItemType>
  cityId: Scalars['String']['output']
  createdAt: Scalars['Date']['output']
  id: Scalars['ID']['output']
  postOfficeId: Scalars['String']['output']
  receiverEmail: Scalars['String']['output']
  receiverName: Scalars['String']['output']
  receiverPhone: Scalars['String']['output']
  receiverSurname: Scalars['String']['output']
  status: Scalars['String']['output']
  supplier: Scalars['String']['output']
}

export type OrderByIdResult = NotFound | Order

export type OrderFilter = {
  status: Scalars['String']['input']
}

export type Pagination = {
  __typename?: 'Pagination'
  currentPage: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type PriceRange = {
  gt: Scalars['Int']['input']
  lt: Scalars['Int']['input']
}

export type PriceRangeType = {
  __typename?: 'PriceRangeType'
  gt: Scalars['Int']['output']
  lt: Scalars['Int']['output']
}

export type Product = {
  __typename?: 'Product'
  amount: Scalars['Int']['output']
  availableColors?: Maybe<Array<ProductColors>>
  basePrice: Scalars['Int']['output']
  brandName: Scalars['String']['output']
  category: CategoryType
  colorName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  currentPrice: Scalars['Int']['output']
  defaultSizeID: Scalars['Int']['output']
  description?: Maybe<Scalars['String']['output']>
  gender: Gender
  id: Scalars['ID']['output']
  images: Array<Scalars['String']['output']>
  inStock: Scalars['Boolean']['output']
  isHidden: Scalars['Boolean']['output']
  parentId: Scalars['ID']['output']
  preview: Scalars['String']['output']
  sizeName: Scalars['String']['output']
  sku: Scalars['String']['output']
  slug: Scalars['String']['output']
  tag?: Maybe<ProductTag>
  title: Scalars['String']['output']
  updatedAt: Scalars['String']['output']
}

export type ProductColors = {
  __typename?: 'ProductColors'
  Amount: Scalars['Int']['output']
  InStock: Scalars['Boolean']['output']
  color: Scalars['String']['output']
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
}

export type ProductDetails = {
  __typename?: 'ProductDetails'
  color: Scalars['String']['output']
  delivery: Scalars['String']['output']
  description: Scalars['String']['output']
  dimensions: Scalars['String']['output']
  images: Array<Scalars['String']['output']>
  productID: Scalars['ID']['output']
}

export type ProductFilter = {
  category?: InputMaybe<Array<CategoryType>>
  gender?: InputMaybe<Array<Gender>>
  instock?: InputMaybe<Scalars['Boolean']['input']>
  isHidden: Scalars['Boolean']['input']
  page: Scalars['Int']['input']
  price?: InputMaybe<PriceRange>
  tag?: InputMaybe<ProductTag>
}

export type ProductRatingVoteInput = {
  productId: Scalars['String']['input']
  rating: Scalars['Int']['input']
}

export type ProductRatingVoteResponse = {
  __typename?: 'ProductRatingVoteResponse'
  isSaved: Scalars['Boolean']['output']
}

export type ProductResult = NotFound | Product

export const enum ProductTag {
  New = 'new',
  Stock = 'stock',
  Top = 'top'
}

export type ProductsResponse = {
  __typename?: 'ProductsResponse'
  pagination: Pagination
  priceRange: PriceRangeType
  products: Array<Product>
}

export type Query = {
  __typename?: 'Query'
  cartProducts: Array<Product>
  homeData?: Maybe<HomeDataResponse>
  logInRoot?: Maybe<LogInRsponse>
  product?: Maybe<ProductResult>
  products: ProductsResponse
  productsByID: Array<Product>
}

export type QueryCartProductsArgs = {
  input: Array<CartItem>
}

export type QueryLogInRootArgs = {
  input: LogInInput
}

export type QueryProductArgs = {
  id: Scalars['ID']['input']
}

export type QueryProductsArgs = {
  filter: ProductFilter
}

export type QueryProductsByIdArgs = {
  ids: Array<Scalars['ID']['input']>
}

export const enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    OrderByIdResult: ['NotFound', 'Order'],
    ProductResult: ['NotFound', 'Product']
  }
}
export default result
