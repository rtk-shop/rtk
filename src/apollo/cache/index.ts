import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // cartItems: {
        //   read(_, { args, toReference }) {
        //     console.log(args)
        //     return toReference({
        //       __typename: 'CartItem',
        //       id: args[id]
        //     })
        //   }
        // }
      }
    }
  }
})

export { cache }
