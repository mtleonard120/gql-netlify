import { ApolloServer, gql } from 'apollo-server-lambda'
import fetch from 'node-fetch'

const typeDefs = gql`
    type Query {
        hello: String
        items(q: String!): Result
    }

    type Result {
        itemSummaries: [Item]
    }

    type Item {
        itemId: ID!
        title: String!
    }
`

const baseURL = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search'

const resolvers = {
    Query: {
        hello: (root, args, context) => {
            return 'Hello, world!'
        },
        items: (parent, args) => {
            const { q } = args
            return fetch(`${baseURL}?q=${q}`, {
                headers: {
                    authorization:
                        'Bearer ' + process.env.REACT_APP_API_KEY,
                },
            }).then(res => res.json())
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
})

exports.handler = server.createHandler()
