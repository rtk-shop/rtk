import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    RootQuery: {
      queryType: true
    },
    Query: {
      fields: {}
    }
  }
})

export { cache }
