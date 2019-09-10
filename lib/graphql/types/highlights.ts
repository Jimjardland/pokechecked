import { gql } from 'apollo-server-express'

export const typeDefs = gql`
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
    stars: [PlayerInfo]
    scorers: [Goal]
  }

  type Goal {
    scorer: Player
    assist: Player
    homeTeamScored: Boolean
    gwg: Boolean
    emptyNet: Boolean
    strength: String
    period: String
    time: String
    description: String
    standing: String
  }

  type PlayerInfo {
    id: Int
    fullName: String
    position: Int
    image: String
  }

  type Player {
    player: PlayerInfo
    seasonTotal: Int
  }

  type Highlights {
    day: String
    games: [Game]
  }
`
