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
  Price: { input: number; output: number }
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

export enum CategoryType {
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

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload'
  id: Scalars['ID']['output']
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unisex = 'UNISEX'
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
  deleteProduct: DeleteProductPayload
  hideProduct?: Maybe<HideProductPayload>
  initSoleProprietorPayment: Payment
  /** processOrder — confirmation that the order has been accepted for processing. */
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

export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input']
}

export type MutationHideProductArgs = {
  id: Scalars['ID']['input']
  isHidden: Scalars['Boolean']['input']
}

export type MutationInitSoleProprietorPaymentArgs = {
  orderId: Scalars['ID']['input']
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

export type NewOrderInput = {
  cityName: Scalars['String']['input']
  name: Scalars['String']['input']
  paymentMethod: OrderPaymentMethod
  phone: Scalars['String']['input']
  postOfficeName: Scalars['String']['input']
  supplier: SupplierService
  surname: Scalars['String']['input']
}

export type NewOrderPayload = {
  __typename?: 'NewOrderPayload'
  createdAt: Scalars['Date']['output']
  id: Scalars['ID']['output']
  price: Scalars['Price']['output']
}

export type NewProductInput = {
  /** amount - non zero and max=999 */
  amount: Scalars['Int']['input']
  basePrice: Scalars['Price']['input']
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
  basePrice: Scalars['Price']['output']
  currentPrice: Scalars['Price']['output']
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
}

export type NewSizeVariation = {
  amount: Scalars['Int']['input']
  basePrice: Scalars['Price']['input']
  productId: Scalars['ID']['input']
  size: Scalars['String']['input']
}

export type NewSizeVariationPayload = {
  __typename?: 'NewSizeVariationPayload'
  amount: Scalars['Int']['output']
  basePrice: Scalars['Price']['output']
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
  paymentMethod: OrderPaymentMethod
  postOfficeName: Scalars['String']['output']
  price: Scalars['Price']['output']
  products: Array<OrderProduct>
  receiverName: Scalars['String']['output']
  receiverPhone: Scalars['String']['output']
  receiverSurname: Scalars['String']['output']
  status: OrderStatus
  supplier: SupplierService
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

export enum OrderPaymentMethod {
  Delivery = 'DELIVERY',
  Online = 'ONLINE'
}

export type OrderProduct = {
  __typename?: 'OrderProduct'
  id: Scalars['ID']['output']
  priceAtOrder: Scalars['Price']['output']
  product: Product
  quantity: Scalars['Int']['output']
}

export enum OrderStatus {
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
  status?: InputMaybe<Array<OrderStatus>>
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

export type Payment = {
  __typename?: 'Payment'
  id: Scalars['ID']['output']
  orderId: Scalars['ID']['output']
  price: Scalars['Price']['output']
  purpose: PaymentPurpose
  status: PaymentStatus
}

export type PaymentPayload = NotFound | Payment

export enum PaymentPurpose {
  Delivery = 'DELIVERY',
  DeliveryAndOrder = 'DELIVERY_AND_ORDER'
}

export enum PaymentStatus {
  AwaitingConfirmation = 'AWAITING_CONFIRMATION',
  Confirmed = 'CONFIRMED',
  Rejected = 'REJECTED'
}

export type PriceRange = {
  gt: Scalars['Price']['input']
  lt: Scalars['Price']['input']
}

export type PriceRangeType = {
  __typename?: 'PriceRangeType'
  gt: Scalars['Price']['output']
  lt: Scalars['Price']['output']
}

export type ProcessOrderPayload = {
  __typename?: 'ProcessOrderPayload'
  id: Scalars['ID']['output']
  status: OrderStatus
  updatedAt: Scalars['String']['output']
}

export type Product = {
  __typename?: 'Product'
  amount: Scalars['Int']['output']
  availableColors?: Maybe<Array<ProductColors>>
  availableSizes: Array<SizeVariation>
  basePrice: Scalars['Price']['output']
  brandName: Scalars['String']['output']
  category: CategoryType
  colorName: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  currentPrice: Scalars['Price']['output']
  details: ProductDetails
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

export type ProductDetails = {
  __typename?: 'ProductDetails'
  /** capacity - capacity represent in liters */
  capacity?: Maybe<Scalars['Int']['output']>
  description: Scalars['HTML']['output']
  /** dimensions - dimensions represent in cm. */
  dimensions?: Maybe<Scalars['String']['output']>
  /** weight - weight represent in kg. */
  weight?: Maybe<Scalars['Float']['output']>
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
  sortBy?: InputMaybe<ProductFilterSortBy>
  tag?: InputMaybe<ProductTag>
}

export enum ProductFilterSortBy {
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

export enum ProductTag {
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
  order: OrderPayload
  orderPayment: PaymentPayload
  orders: OrdersConnection
  payment: PaymentPayload
  product: ProductPayload
  products: ProductConnection
  productsByID: Array<Product>
  userFavouriteProducts: Array<Product>
  /**
   * userOrders - getting orders of the user with authorization.
   *   - CUSTOMER - only own orders
   *   - MANAGER, ADMIN - can receive orders from all users
   */
  userOrders: UserOrdersConnection
}

export type QueryOrderArgs = {
  id: Scalars['ID']['input']
}

export type QueryOrderPaymentArgs = {
  orderId: Scalars['ID']['input']
}

export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
  where?: InputMaybe<OrdersFilter>
}

export type QueryPaymentArgs = {
  id: Scalars['ID']['input']
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
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
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

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Manager = 'MANAGER'
}

export type SizeVariation = {
  __typename?: 'SizeVariation'
  productId: Scalars['String']['output']
  size: Scalars['String']['output']
}

export enum SupplierService {
  Novap = 'NOVAP',
  Ukrp = 'UKRP'
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

export type UserOrdersConnection = {
  __typename?: 'UserOrdersConnection'
  edges: Array<OrderEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
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
    PaymentPayload: ['NotFound', 'Payment'],
    ProductPayload: ['NotFound', 'Product']
  }
}
export default result
