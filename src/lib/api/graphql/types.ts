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
  Date: { input: string; output: string }
  HTML: { input: string; output: string }
  Upload: { input: unknown; output: unknown }
}

export type AddFavouritePayload = {
  __typename?: 'AddFavouritePayload'
  productId: Scalars['ID']['output']
  productTitle: Scalars['String']['output']
}

export type CartItem = {
  __typename?: 'CartItem'
  productId: Scalars['ID']['output']
  quantity: Scalars['Int']['output']
}

export type CartItemInput = {
  productId: Scalars['ID']['input']
  quantity: Scalars['Int']['input']
}

export type CartProduct = {
  __typename?: 'CartProduct'
  id: Scalars['ID']['output']
  product: Product
  quantity: Scalars['Int']['output']
}

export const enum CategoryType {
  Backpack = 'BACKPACK',
  Bag = 'BAG',
  Other = 'OTHER',
  Suitcase = 'SUITCASE',
  Wallet = 'WALLET'
}

export type ClearCartPayload = {
  __typename?: 'ClearCartPayload'
  cartId: Scalars['ID']['output']
}

export const enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unisex = 'UNISEX'
}

export type GlobalData = {
  __typename?: 'GlobalData'
  id: Scalars['ID']['output']
  updatedAt: Scalars['String']['output']
  usdCourse: Scalars['Float']['output']
}

export type HideProductPayload = {
  __typename?: 'HideProductPayload'
  isHidden: Scalars['Boolean']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  addCartItem: CartItem
  addFavouriteProduct: AddFavouritePayload
  clearCart: ClearCartPayload
  createOrder: NewOrderPayload
  hideProduct?: Maybe<HideProductPayload>
  /** reduceCartItemQuantity - reduces cart item quantity by one */
  reduceCartItemQuantity: CartItem
  /**
   * rejectOrder - отменяет ордера учитывая контекст авторизации
   *
   * CUSTOMER - только собственные ордера
   * MANAGER, ADMIN - могут отменить ордера любого пользователя
   */
  rejectOrder: RejectOrderPayload
  removeCartItem: RemoveCartItemPayload
  removeFavouriteProduct: RemoveFavouritePayload
  setUsdCourse: GlobalData
}

export type MutationAddCartItemArgs = {
  input: CartItemInput
}

export type MutationAddFavouriteProductArgs = {
  productId: Scalars['ID']['input']
}

export type MutationCreateOrderArgs = {
  input: NewOrderInput
}

export type MutationHideProductArgs = {
  id: Scalars['ID']['input']
  isHidden: Scalars['Boolean']['input']
}

export type MutationReduceCartItemQuantityArgs = {
  productId: Scalars['ID']['input']
}

export type MutationRejectOrderArgs = {
  orderId: Scalars['ID']['input']
}

export type MutationRemoveCartItemArgs = {
  productId: Scalars['ID']['input']
}

export type MutationRemoveFavouriteProductArgs = {
  productId: Scalars['ID']['input']
}

export type MutationSetUsdCourseArgs = {
  input: Scalars['Float']['input']
}

export type NewOrderInput = {
  cityName: Scalars['String']['input']
  name: Scalars['String']['input']
  phone: Scalars['String']['input']
  postOfficeName: Scalars['String']['input']
  supplier: Scalars['String']['input']
  surname: Scalars['String']['input']
}

export type NewOrderPayload = {
  __typename?: 'NewOrderPayload'
  createdAt: Scalars['Date']['output']
  id: Scalars['Int']['output']
  price: Scalars['Float']['output']
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']['output']
}

export type Order = {
  __typename?: 'Order'
  cartProducts: Array<CartProduct>
  cityName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  id: Scalars['ID']['output']
  parcelTrackId?: Maybe<Scalars['String']['output']>
  postOfficeName: Scalars['String']['output']
  price: Scalars['Float']['output']
  receiverName: Scalars['String']['output']
  receiverPhone: Scalars['String']['output']
  receiverSurname: Scalars['String']['output']
  status: OrderStatus
  supplier: Scalars['String']['output']
  updatedAt: Scalars['String']['output']
}

export type OrderFilter = {
  status: Scalars['String']['input']
}

export type OrderPayload = NotFound | Order

export const enum OrderStatus {
  Accepted = 'ACCEPTED',
  Created = 'CREATED',
  Done = 'DONE',
  Processed = 'PROCESSED',
  Rejected = 'REJECTED',
  Returned = 'RETURNED',
  Sent = 'SENT'
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
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

/** Общее представление продукта */
export type Product = {
  __typename?: 'Product'
  amount: Scalars['Int']['output']
  availableColors?: Maybe<Array<ProductColors>>
  basePrice: Scalars['Float']['output']
  brandName: Scalars['String']['output']
  category: CategoryType
  colorName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  currentPrice: Scalars['Float']['output']
  defaultSizeID: Scalars['Int']['output']
  description: Scalars['HTML']['output']
  gender: Gender
  id: Scalars['ID']['output']
  images: Array<Scalars['String']['output']>
  inStock: Scalars['Boolean']['output']
  isHidden: Scalars['Boolean']['output']
  parentId: Scalars['ID']['output']
  preview: Scalars['String']['output']
  sizeName: Scalars['String']['output']
  sku: Scalars['String']['output']
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

export type ProductConnection = {
  __typename?: 'ProductConnection'
  edges: Array<ProductEdge>
  pageInfo: PageInfo
  priceRange: PriceRangeType
  totalCount: Scalars['Int']['output']
}

export type ProductEdge = {
  __typename?: 'ProductEdge'
  cursor: Scalars['String']['output']
  node: Product
}

export type ProductFilter = {
  category?: InputMaybe<Array<CategoryType>>
  gender?: InputMaybe<Array<Gender>>
  instock?: InputMaybe<Scalars['Boolean']['input']>
  isHidden: Scalars['Boolean']['input']
  price?: InputMaybe<PriceRange>
  tag?: InputMaybe<ProductTag>
}

export type ProductPayload = NotFound | Product

export const enum ProductTag {
  New = 'NEW',
  Stock = 'STOCK',
  Top = 'TOP'
}

export type Query = {
  __typename?: 'Query'
  cartProducts: Array<CartProduct>
  globalData: GlobalData
  product: ProductPayload
  products: ProductConnection
  productsByID: Array<Product>
  userFavouriteProducts: Array<Product>
  /**
   * userOrders - получение ордеров учитывая контекст авторизации
   *
   * CUSTOMER - только собственные ордера
   * MANAGER, ADMIN - могут получить ордера всех пользователей
   */
  userOrders: Array<Order>
}

export type QueryProductArgs = {
  id: Scalars['ID']['input']
}

export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
  where?: InputMaybe<ProductFilter>
}

export type QueryProductsByIdArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryUserOrdersArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type RejectOrderPayload = {
  __typename?: 'RejectOrderPayload'
  id: Scalars['ID']['output']
  status: OrderStatus
  updatedAt: Scalars['String']['output']
}

export type RemoveCartItemPayload = {
  __typename?: 'RemoveCartItemPayload'
  productId: Scalars['ID']['output']
}

export type RemoveFavouritePayload = {
  __typename?: 'RemoveFavouritePayload'
  productId: Scalars['ID']['output']
}

export const enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Manager = 'MANAGER'
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']['output']
  firstName: Scalars['String']['output']
  id: Scalars['ID']['output']
  phone: Scalars['String']['output']
  role: Scalars['String']['output']
  updatedAt: Scalars['String']['output']
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    OrderPayload: ['NotFound', 'Order'],
    ProductPayload: ['NotFound', 'Product']
  }
}
export default result
