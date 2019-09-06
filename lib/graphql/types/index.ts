import * as highlights from './highlights'
import * as playoffs from './playoffs'
import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    getPlayoffs: Playoffs
    fetchHighlights(from: String, to: String): [Highlights]
  }
`

export default [highlights.typeDefs, playoffs.typeDefs, typeDefs]
