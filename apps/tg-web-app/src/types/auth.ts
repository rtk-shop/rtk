export type UserRole = 'admin' | 'manager' | 'customer'

export type SessionTokenData = {
  role: UserRole
  userId: string
  firstName: string
}

export type RefreshTokenData = {
  userId: string
}
