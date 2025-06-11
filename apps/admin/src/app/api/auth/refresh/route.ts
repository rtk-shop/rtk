import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  console.log(cookieStore.getAll())

  const resp = NextResponse.json('Hello, Next.js!', {
    status: 200
  })

  resp.cookies.set('rand', `${Math.random()}`, {
    path: '/',
    sameSite: 'lax'
  })

  return resp
}
