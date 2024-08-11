import { NextApiRequest, NextApiResponse } from 'next'

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
      const body = await resp.json()
      const cookies = resp.headers.getSetCookie()
      const sessionCookie = `session=${body.accessToken}; Path=/; Max-Age=${15 * 60}; HttpOnly`
      res.setHeader('Set-Cookie', [...cookies, sessionCookie])

      res.status(resp.status).json(body)
    } else {
      const body = await resp.text()
      res.status(resp.status).send(body)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('server error')
  }
}
