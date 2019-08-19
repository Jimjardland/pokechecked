import {
  QueryResolvers,
  Game,
  PlayerInfo
} from '../../../__generated__/pokechecked'
import * as got from 'got'
import * as moment from 'moment'
import * as queryString from 'query-string'

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

export const fetchHighlights: QueryResolvers['fetchHighlights'] = async (
  _,
  { to, from }
) => {
  const params = {
    startDate:
      from ||
      moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD'),
    endDate: to || moment().format('YYYY-MM-DD'),
    leaderCategories: 'points,goals,assists',
    leaderGameTypes: 'R',
    expand:
      'schedule.teams,schedule.linescore,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content'
  }

  const url = `https://statsapi.web.nhl.com/api/v1/schedule?${queryString.stringify(
    params
  )}`

  const { body: gameData } = await got(url, {
    json: true,
    headers: { 'Content-type': 'application/json' }
  })

  return gameData.dates.map(gameDay => {
    return {
      day: moment(gameDay.date).format('dddd MMMM Do YYYY'),
      games: formatGames(gameDay.games)
    }
  })
}

const formatGames = (games): Game => {
  return games.map(game => {
    const gameIsFinished = game.linescore.currentPeriodTimeRemaining === 'Final'
    return {
      homeTeam: game.teams.home.team.name,
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
      scorers: getScorers(game.scoringPlays)
    }
  })
}

const getStars = ({ firstStar, secondStar, thirdStar }: any): PlayerInfo[] => {
  return [
    {
      ...firstStar,
      position: 1
    },
    {
      ...secondStar,
      position: 2
    },
    {
      ...thirdStar,
      position: 3
    }
  ]
}

const getScorers = (data: any): [] => {
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
      description: play.result.description,
      standing: `${play.about.goals.home}-${play.about.goals.away}`,
      gwg: play.result.gameWinningGoal,
      emptyNet: play.result.emptyNet,
      strength: play.result.strength.code,
      period: play.about.ordinalNum,
      time: play.about.periodTime
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
