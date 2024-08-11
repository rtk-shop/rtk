import { useCallback, useState } from 'react'

type SuccessData = {
  accessToken: string
}

type params = {
  onSuccess: (data: SuccessData) => void
  onError: (error: string) => void
}

type ReturnValues<T> = [(bodyData: T) => void, { data: T | undefined; loading: boolean }]

export function useSignUp<T>({ onSuccess, onError }: params): ReturnValues<T> {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)

  const query = useCallback(
    (bodyData: T) => {
      setLoading(true)
      fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        cache: 'no-cache',
        credentials: 'include'
      })
        .then((resp) => {
          if (resp.status === 409) throw new Error('auth:signUp.errors.userExists')
          if (!resp.ok) throw new Error('auth:signUp.errors.signup')

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
