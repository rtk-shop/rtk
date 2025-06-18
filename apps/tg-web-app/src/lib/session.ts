import { decodeJwt } from 'jose'
import type { SessionTokenData, RefreshTokenData } from '@/types/auth'

export const SESSION_COOKIE_NAME = 'w_auth'
export const REFRESH_COOKIE_NAME = 'rft'
export const DIRECT_SESSION_HEADER = 'x-direct-session'

export function parseSessionToken(token?: string) {
  if (!token) return null
  try {
    return decodeJwt<SessionTokenData>(token)
  } catch (error) {
    return null
  }
}

export function parseRefreshToken(token?: string) {
  if (!token) return null
  try {
    return decodeJwt<RefreshTokenData>(token)
  } catch (error) {
    return null
  }
}

type RefreshResp = {
  setCookieHeader: string
  sessionToken: string
}

export async function refreshSession(cookie?: {
  name: string
  value: string
}): Promise<RefreshResp | null> {
  if (!cookie) return null

  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/refresh', {
      cache: 'no-store',
      headers: {
        Cookie: `${cookie.name}=${cookie.value}`
      }
    })

    if (!resp.ok) {
      const errorMessage = await resp.text()
      throw new Error(errorMessage)
    }

    const setCookieHeader = resp.headers.get('Set-Cookie')
    if (!setCookieHeader) throw new Error('response has no «Set-Cookie» header')

    const cookies = resp.headers.getSetCookie()

    const refreshCookie = cookies.find((c) => c.startsWith(`${REFRESH_COOKIE_NAME}=`))
    const sessionCookie = cookies.find((c) => c.startsWith(`${SESSION_COOKIE_NAME}=`))

    if (!refreshCookie || !sessionCookie) {
      throw new Error(`no ${REFRESH_COOKIE_NAME} and ${SESSION_COOKIE_NAME} cookies`)
    }

    const authToken = sessionCookie
      .split(';')
      .find((v) => v.startsWith(`${SESSION_COOKIE_NAME}=`))
      ?.split('=')[1]

    if (!authToken) throw new Error('failed to extract session token')

    return { setCookieHeader, sessionToken: authToken }
  } catch (error) {
    console.log(error)
    return null
  }
}
