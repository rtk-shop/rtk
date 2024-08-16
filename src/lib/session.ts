import { NextResponse } from 'next/server'
import { decodeJwt } from 'jose'
import type { SuccessfulAuthorization, SessionData } from '@/types'

export function decrypt(input?: string) {
  if (!input) return
  try {
    return decodeJwt<SessionData>(input)
  } catch (error) {
    return
  }
}

type RefreshResp = {
  refreshCookie: string
  accessToken: string
}

export async function refreshSession(cookie?: {
  name: string
  value: string
}): Promise<RefreshResp | null> {
  if (!cookie) return null

  try {
    const headers = new Headers()
    headers.set('Cookie', `${cookie.name}=${cookie.value}`)

    const resp = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/refresh', {
      cache: 'no-cache',
      credentials: 'include',
      headers
    })

    if (resp.ok) {
      const cookies = resp.headers.getSetCookie()
      const refreshCookie = cookies.find((c) => c.startsWith('rfr='))

      if (!refreshCookie) return null

      const data = (await resp.json()) as SuccessfulAuthorization

      return {
        refreshCookie,
        accessToken: data.accessToken
      }
    }

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export function setSessionCookie(res: NextResponse, accessToken: string) {
  const token = decrypt(accessToken)
  if (!token) throw new Error('failed to create session cookie: wrong access token')

  const tokenExp = token.exp as number

  res.cookies.set('session', accessToken, {
    expires: tokenExp * 1000, // add epoch to jwt exp seconds
    path: '/',
    httpOnly: false
  })
}
