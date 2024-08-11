import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/signup', {
      method: 'POST',
      body: req.body,
      cache: 'no-cache',
      credentials: 'include'
    })

    if (resp.ok) {
      const body = await resp.json()
      const cookies = resp.headers.getSetCookie()
      const sessionCookie = `session=${body.accessToken}; Path=/; Max-Age=${15 * 60}; HttpOnly`
      res.setHeader('Set-Cookie', [...cookies, sessionCookie])

      res.status(200).json(body)
    } else {
      const body = await resp.text()
      res.status(resp.status).send(body)
    }
  } catch (error) {
    console.log(error)
  }
}
