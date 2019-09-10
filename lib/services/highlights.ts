import { Game, PlayerInfo, Goal } from '../__generated__/pokechecked'

interface Item {
  guid: String
  mediastate: String
  mediaPlaybackId: String
  mediaFeedType: String
  callLetters: String
  eventId: String
  language: String
  freeGame: Boolean
  feedName: String
  gamePlus: Boolean
}

interface Epg {
  title: String
  platform: String
  items: Item[]
}

export const formatGames = (games): Game => {
  return games.map(game => {
    const gameIsFinished = game.linescore.currentPeriodTimeRemaining === 'Final'
    const homeTeam = game.teams.home.team
    return {
      homeTeam: homeTeam.name,
      awayTeam: game.teams.away.team.name,
      homeGoals: game.teams.home.score,
      awayGoals: game.teams.away.score,
      homeWin: game.teams.home.score > game.teams.away.score,
      arena: game.venue.name,
      date: game.gameDate,
      gameIsFinished,
      requiredOvertime:
        gameIsFinished && game.linescore.currentPeriodOrdinal !== '3rd',
      url: getHighlightsUrl(game.content.media.epg),
      stars: getStars(game.decisions),
      scorers: getScorers(game.scoringPlays, homeTeam.id),
    }
  })
}

const getStars = ({ firstStar, secondStar, thirdStar }: any): PlayerInfo[] => {
  return [
    {
      ...firstStar,
      position: 1,
    },
    {
      ...secondStar,
      position: 2,
    },
    {
      ...thirdStar,
      position: 3,
    },
  ]
}

const getScorers = (data: any, homeTeamId: number): [Goal] => {
  return data.map(play => {
    const scorer = play.players.find(info =>
      info.playerType === 'Scorer' ? info : null
    )
    const assist = play.players.find(info =>
      info.playerType === 'Assist' ? info : null
    )

    return {
      scorer,
      assist,
      homeTeamScored: homeTeamId === play.team.id,
      description: play.result.description,
      standing: `${play.about.goals.home}-${play.about.goals.away}`,
      gwg: play.result.gameWinningGoal,
      emptyNet: play.result.emptyNet,
      strength: play.result.strength.code,
      period: play.about.ordinalNum,
      time: play.about.periodTime,
    }
  })
}

export const getHighlightsUrl = (epgs: Epg[]): String => {
  let videoId
  for (let i = 0; i < epgs.length; i++) {
    const epg = epgs[i]

    if (epg.items.length) {
      switch (epg.title) {
        case 'Recap':
          videoId = epg.items[0].mediaPlaybackId || false
          break
        case 'Extended Highlights':
          videoId = epg.items[0].mediaPlaybackId || false
          break
      }
    }
  }
  return videoId
    ? `https://www.nhl.com/video/embed/c-${videoId}&autoplay=true`
    : null
}
