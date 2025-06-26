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
  /** id - is a reference to product.ID */
  id: Scalars['ID']['output']
  product: Product
  quantity: Scalars['Int']['output']
}

export const enum CategoryType {
  Backpack = 'BACKPACK',
  Bag = 'BAG',
  Other = 'OTHER',
  Suitcase = 'SUITCASE'
}

export type ClearCartPayload = {
  __typename?: 'ClearCartPayload'
  cartId: Scalars['ID']['output']
}

export type DashboardStats = {
  __typename?: 'DashboardStats'
  orders: OrdersStats
  products: ProductsStats
  users: UsersStats
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
  createProduct: NewProductPayload
  createProductSizeVariation: NewSizeVariationPayload
  hideProduct?: Maybe<HideProductPayload>
  processOrder: ProcessOrderPayload
  /** reduceCartItemQuantity - reduces cart item quantity by one */
  reduceCartItemQuantity: CartItem
  /**
   * rejectOrder - cancels orders with authorization.
   *  - CUSTOMER - cancels only own orders
   *  - MANAGER, ADMIN - can cancel orders of any user
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

export type MutationCreateProductArgs = {
  input: NewProductInput
}

export type MutationCreateProductSizeVariationArgs = {
  input: NewSizeVariation
}

export type MutationHideProductArgs = {
  id: Scalars['ID']['input']
  isHidden: Scalars['Boolean']['input']
}

export type MutationProcessOrderArgs = {
  id: Scalars['ID']['input']
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

export type NewProductInput = {
  /** amount - non zero and max=999 */
  amount: Scalars['Int']['input']
  basePrice: Scalars['Float']['input']
  brandName: Scalars['String']['input']
  category: CategoryType
  description: Scalars['HTML']['input']
  gender: Gender
  images: Array<ProductImageInput>
  preview: Scalars['Upload']['input']
  sizeName: Scalars['String']['input']
  sku: Scalars['String']['input']
  title: Scalars['String']['input']
}

export type NewProductPayload = {
  __typename?: 'NewProductPayload'
  basePrice: Scalars['Float']['output']
  currentPrice: Scalars['Float']['output']
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
}

export type NewSizeVariation = {
  amount: Scalars['Int']['input']
  basePrice: Scalars['Float']['input']
  productId: Scalars['ID']['input']
  size: Scalars['String']['input']
}

export type NewSizeVariationPayload = {
  __typename?: 'NewSizeVariationPayload'
  amount: Scalars['Int']['output']
  basePrice: Scalars['Float']['output']
  productId: Scalars['ID']['output']
  size: Scalars['String']['output']
}

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']['output']
}

export type Order = {
  __typename?: 'Order'
  cityName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  id: Scalars['ID']['output']
  parcelTrackId?: Maybe<Scalars['String']['output']>
  postOfficeName: Scalars['String']['output']
  /** price - represent a SQL numeric(8, 2) type, which max value is 999999.99 */
  price: Scalars['Float']['output']
  products: Array<OrderProduct>
  receiverName: Scalars['String']['output']
  receiverPhone: Scalars['String']['output']
  receiverSurname: Scalars['String']['output']
  status: OrderStatus
  supplier: Scalars['String']['output']
  updatedAt: Scalars['String']['output']
}

export type OrderEdge = {
  __typename?: 'OrderEdge'
  cursor: Scalars['String']['output']
  node: Order
}

export type OrderFilter = {
  status: Scalars['String']['input']
}

export type OrderPayload = NotFound | Order

export type OrderProduct = {
  __typename?: 'OrderProduct'
  id: Scalars['ID']['output']
  priceAtOrder: Scalars['Float']['output']
  product: Product
  quantity: Scalars['Int']['output']
}

export const enum OrderStatus {
  Created = 'CREATED',
  Done = 'DONE',
  Processed = 'PROCESSED',
  Rejected = 'REJECTED',
  Returned = 'RETURNED',
  Sent = 'SENT'
}

export type OrdersConnection = {
  __typename?: 'OrdersConnection'
  edges: Array<OrderEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type OrdersFilter = {
  status?: InputMaybe<OrderStatus>
}

export type OrdersStats = {
  __typename?: 'OrdersStats'
  /** count — all orders with DONE status */
  count: Scalars['Int']['output']
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
  gt: Scalars['Float']['input']
  lt: Scalars['Float']['input']
}

export type PriceRangeType = {
  __typename?: 'PriceRangeType'
  gt: Scalars['Float']['output']
  lt: Scalars['Float']['output']
}

export type ProcessOrderPayload = {
  __typename?: 'ProcessOrderPayload'
  orderId: Scalars['ID']['output']
  status: OrderStatus
  updatedAt: Scalars['String']['output']
}

export type Product = {
  __typename?: 'Product'
  amount: Scalars['Int']['output']
  availableColors?: Maybe<Array<ProductColors>>
  availableSizes: Array<SizeVariation>
  basePrice: Scalars['Float']['output']
  brandName: Scalars['String']['output']
  category: CategoryType
  colorName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  currentPrice: Scalars['Float']['output']
  description: Scalars['HTML']['output']
  gender: Gender
  id: Scalars['ID']['output']
  images: Array<Scalars['String']['output']>
  inStock: Scalars['Boolean']['output']
  isHidden: Scalars['Boolean']['output']
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
  sortBy: ProductFilterSortBy
  tag?: InputMaybe<ProductTag>
}

export const enum ProductFilterSortBy {
  Default = 'DEFAULT',
  /** PRICE_ASC - from cheap to expensive */
  PriceAsc = 'PRICE_ASC',
  /** PRICE_DESC - from expensive to cheap */
  PriceDesc = 'PRICE_DESC'
}

export type ProductImageInput = {
  image: Scalars['Upload']['input']
  /** order - starts from 1 not from zero-index */
  order: Scalars['Int']['input']
}

export type ProductPayload = NotFound | Product

export const enum ProductTag {
  New = 'NEW',
  Stock = 'STOCK',
  Top = 'TOP'
}

export type ProductsStats = {
  __typename?: 'ProductsStats'
  /** count — all products available for sale */
  count: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  cartProducts: Array<CartProduct>
  dashboardStats: DashboardStats
  globalData: GlobalData
  order: OrderPayload
  orders: OrdersConnection
  product: ProductPayload
  products: ProductConnection
  productsByID: Array<Product>
  userFavouriteProducts: Array<Product>
  /**
   * userOrders - getting orders of the user with authorization.
   *   - CUSTOMER - only own orders
   *   - MANAGER, ADMIN - can receive orders from all users
   */
  userOrders: Array<Order>
}

export type QueryOrderArgs = {
  id: Scalars['ID']['input']
}

export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
  where?: InputMaybe<OrdersFilter>
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

export type SizeVariation = {
  __typename?: 'SizeVariation'
  productId: Scalars['String']['output']
  size: Scalars['String']['output']
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

export type UsersStats = {
  __typename?: 'UsersStats'
  count: Scalars['Int']['output']
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
