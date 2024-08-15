import { NextApiRequest, NextApiResponse } from 'next'
import { decodeJwt } from 'jose'
import { SuccessfulAuthorization } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query // 'login' | 'signup'

  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/' + type, {
      method: req.method,
      body: req.body,
      cache: 'no-cache',
      credentials: 'include'
    })

    if (resp.ok) {
      const data = (await resp.json()) as SuccessfulAuthorization

      const token = decodeJwt(data.accessToken)
      const tokenExp = token.exp as number

      const cookies = resp.headers.getSetCookie()

      const exp = new Date(tokenExp * 1000).toUTCString() // add epoch to jwt exp seconds

      const sessionCookie = `session=${data.accessToken}; Path=/; Expires=${exp}; HttpOnly`

      res.setHeader('Set-Cookie', [...cookies, sessionCookie])

      res.status(resp.status).json(data)
    } else {
      const body = await resp.text()
      res.status(resp.status).send(body)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('server error')
  }
}
