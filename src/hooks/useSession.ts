import { useMemo } from 'react'
import jsCookie from 'js-cookie'
import { SESSION_COOKIE_NAME, parseSessionToken } from '@/lib/session'
import type { SessionTokenData } from '@/types'

export const useSession = (): SessionTokenData | null => {
  const session = jsCookie.get(SESSION_COOKIE_NAME)
  const data = useMemo(() => parseSessionToken(session), [session])
  return data
}
