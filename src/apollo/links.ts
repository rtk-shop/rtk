import { promiseToObservable } from './lib'
import { ApolloLink } from '@apollo/client/link/core'
import { onError } from '@apollo/client/link/error'
import { HttpLink } from '@apollo/client/link/http'

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_HOST + '/graphql'
})

export const authorizationLink = new ApolloLink((operation, forward) => {
  const token = 'what?'

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : null
    }
  }))

  return forward(operation)
})

interface refreshReponse {
  accessToken: string
}

// https://github.com/apollographql/apollo-link/issues/646
export const refreshLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    const err = graphQLErrors[0].extensions

    switch (err?.code) {
      case '401': {
        console.warn('refreshing access token')

        const refsresh = fetch(process.env.NEXT_PUBLIC_API_HOST + '/refresh', {
          method: 'GET',
          cache: 'no-cache',
          credentials: 'include'
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(`bad request, code ${resp.status}`)
            return resp.json()
          })
          .then((data: refreshReponse) => {
            // const ok = isTokenValid(data.accessToken)
            // if (!ok) {
            //   throw new Error('new AT is broken')
            // }

            // AuthStore.signIn(data.accessToken)

            console.log(
              '%c authentication successfully refreshed ',
              'background: #222; color: #bada55'
            )

            return data.accessToken
          })
          .catch((err) => {
            console.warn(err)
            console.info('logout...')
            // AuthStore.logout()
            // UserStore.clearUser()
          })

        return promiseToObservable(refsresh).flatMap((token) => {
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${token}`
            }
          })

          // retry request
          return forward(operation)
        })
      }
    }
  }

  if (networkError) console.warn(`[Network error]: ${networkError}`)
})
