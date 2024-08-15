export type SuccessfulAuthorization = {
  accessToken: string
}

export type SessionData = {
  role: 'admin' | 'manager' | 'customer'
  userId: string
  firstName: string
}
