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
                        'Bearer v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAAAOVYa2wUVRTutttqhSImxEdTYB38w2Nm7+zu7GPS3WShEDahD7rlGSudnbnTHTo7M5l7p+0iaGlMgQTUqIGgCfQPYiIESVDjD8SgUVQiJkrAKjZFCCYGTQyKEhDvTB9sK4GlLKSJ+2cy95577ne+8525Zy/oKiuf07O453KF64Hi3i7QVexysZNAeVnp3CklxZWlRSDHwNXb9VSXu7vk52okZFSDb4TI0DUEPZ0ZVUO8MxilLFPjdQEpiNeEDEQ8FvlkvHYJ72MAb5g61kVdpTyJmijFhcKBoM8X4GQpkBIiZFAbdtmkRykf5IK+CAwAieWABEJkHiELJjSEBQ2TecBGaBCmWdAEWN4f5gHH+Dl2NeVZDk2k6BoxYQAVc9DyzlozB+qtkQoIQRMTJ1QsEV+UrI8nahbWNVV7c3zFhmhIYgFbaPTbAl2CnuWCasFbb4Mcaz5piSJEiPLGBncY7ZSPD4MZB3yHaVkSQlAGAIqBCPBH2IJQuUg3MwK+NQ57RJFo2THloYYVnL0do4SN1Foo4qG3OuIiUeOxH0stQVVkBZpRauH8+Kp4QwMVq1XEtADVJTQXkcN0ICAFaIHIhY5EQhIAATYcjgSHNhn0NETxmF0W6Jqk2IQhT52O50OCGI7lxZfDCzGq1+rNuIxtNLl2/mH+AsHVdkIHM2jhtGbnFGYICR7n9fbsj6zG2FRSFoYjHsZOOPREKcEwFIkaO+nocEg6nShKpTE2eK+3o6OD6fAzutnq9QHAelfWLkmKaZgRqGFbu9aRcvsFtOKEIkKyEik8zhoESyfRKQGgtVIxUuPAN5yF0bBiY0f/M5ATs3d0NRSqOthgQBYFmQOiyIVAyF+I6ogNCdRr44ApIUtnBLMNYkMVREiLRGdWBpqKxPs52ecPy5CWghGZDkRkmU5xUpBmZQgBhKmUGAn/X4okX5knRd2ADbqqiNnCib0QQvebUoNg4ux8K0vek1BVySNf3d80VGSHej+CtGs9/0BtH4g4EQyFsdXNiHrGqwvks2YPrXFQe/Ix8qasLNNqQYQJEomcKnkvUohEGFIkUv5LBkuQBJD/EtKxSJaIx7WRU+sMYVJpTWN0R3t2joMUROTGqHqrgrAiIsawJP2upBc3jEQmY2EhpcJEAU+V+3+i3DQ8hfRbEyomktPB5CrSYKPEOBlmULvImBDplkl6RKbe7h2a9Daoka8xNnVVheZy9s6YsGv9JsmeYDm+g0NrfAoocLc0QXQtqgqRz5qJFtk9z6Yi4IkVMcsFuQBgQZi7q7gWOPlsyo6zDXBvPHrPIlysIwyle9DXe0dfMMSKnB/b7ToMul0fFLtcIARodi6YXVayzF0ymUKkGWCQoEkpvZNRBJkhR65G/kCbkGmDWUNQzOIyl9L3rfhXztVGbzN4fORyo7yEnZRz0wGqbsyUsg8/VsFGQJgl5PjDgFsNZt2YdbOPuqd9VPzFsQNf7llZPfDMgSw/dyO4fqYNVIwYuVylRe5uV9H6yU9fiQ7MO9lZVNkydfqRxMypB6t+bd4zZeu1FfvOXes5YexJ9pxwN1du3X38uaYd673fP3Tul+2PVDXWv3V8/1fTT7QsvvJ3y6Hfdz5/rbKZTT9rnG5uueTd3H6h70+t+/OigxsuvJTasrf09Hmh9CL+7disq59+4jp6+dArS6fgeRdef2Fm38c/bDusbqhOJVZYs8+en1yzbG3Dptr9Zwb2vnd4DTvjjQdffedknHmtMvbT7JPTd8o7Wuv2vh9p33714sJ121bp0UtPnGp3VxwRX3zzyZpdX6vwx2nX031qf/+pdzdvqZ/xx27G39/buGVfBzOnYaD/n6od33y26dDbZ1/+7sPydY27jgZWdAwMDKbxXwCGOmp0EgAA',
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
