import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Playoffs {
    eastern: [Matchup]
    western: [Matchup]
  }

  type Matchup {
    team1: Team
    team2: Team
  }

  type Team {
    team: TeamInfo
    leagueRank: String
    leagueL10Rank: String
    leagueRoadRank: String
    leagueHomeRank: String
    wildCardRank: String
  }

  type TeamInfo {
    name: String
  }
`
