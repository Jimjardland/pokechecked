const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
import { fetchHighlights } from './lib/highlights'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Game {
    homeTeam: String
    awayTeam: String
    homeGoals: Int
    awayGoals: Int
    homeWin: Boolean
    arena: String
    date: String
    gameIsFinished: Boolean
    requiredOvertime: Boolean
    url: String
  }

  type Highlights {
    day: String
    games: [Game]
  }


  type Query {
    fetchHighlights (Hello: String) : [Highlights]
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    fetchHighlights
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
