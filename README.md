```bash
 $ nvm use / fnm use
 $ npm i
 $ npm run dev
```

Example queries:

```graphql
query {
  fetchHighlights(from: "2018-10-06", to: "2018-10-07") {
    day
    games {
      homeTeam
      awayTeam
      homeGoals
      awayGoals
      homeWin
      arena
      date
      gameIsFinished
      requiredOvertime
      url
      stars {
        fullName
        id
        position
      }
      scorers {
        scorer {
          player {
            fullName
            id
          }
          seasonTotal
        }
        gwg
        description
        standing
        strength
      }
    }
  }
}
```

```graphql
query {
  getPlayoffs {
    eastern {
      team1 {
        team {
          name
        }
        leagueRank
      }
      team2 {
        team {
          name
        }
        leagueRank
      }
    }
    western {
      team1 {
        team {
          name
        }
        leagueRank
      }
      team2 {
        team {
          name
        }
        leagueRank
      }
    }
  }
}
```
