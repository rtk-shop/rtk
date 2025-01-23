import { useCallback, useState } from 'react'
import { SuccessfulAuthorization } from '@/types'

type params = {
  onSuccess: (data: SuccessfulAuthorization) => void
  onError: (error: string) => void
}

type ReturnValues<T> = [(bodyData: T) => void, { data: T | undefined; loading: boolean }]

export function useLogIn<T>({ onSuccess, onError }: params): ReturnValues<T> {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)

  const query = useCallback(
    (bodyData: T) => {
      setLoading(true)
      fetch('/api/auth?type=login', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        cache: 'no-cache',
        credentials: 'include'
      })
        .then((resp) => {
          if (resp.status === 404) throw new Error('Пользователь не зарегестрирован')
          if (!resp.ok || resp.status >= 500) throw new Error('Ошибка на стороне сервера')

          return resp.json()
        })
        .then((authData) => {
          setLoading(false)
          setData(authData)
          onSuccess(authData)
        })
        .catch((error: Error) => {
          setLoading(false)
          onError(error.message)
        })
    },
    [onSuccess, onError]
  )

  return [query, { data, loading }]
}
