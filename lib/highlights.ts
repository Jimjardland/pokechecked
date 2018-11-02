import * as got from 'got'
import * as moment from 'moment'

interface Item  {
  guid: String,
  mediastate: String,
  mediaPlaybackId: String,
  mediaFeedType: String,
  callLetters: String,
  eventId: String,
  language: String,
  freeGame: Boolean,
  feedName: String,
  gamePlus: Boolean
}

interface Epg {
  title: String
  platform: String
  items: Item[]
}

interface Game {
  homeTeam: String,
  awayTeam: String,
  homeGoals: Number,
  awayGoals: Number,
  homeWin: Boolean,
  arena: String,
  date: String,
  gameIsFinished: Boolean,
  requiredOvertime: Boolean,
  url: String
}

interface Highlights {
  day: String,
  games: Game[]
}

export const fetchHighlights = async () : Promise<Highlights[]> => {
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yesterday}&endDate=${today}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.radioBroadcasts,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhlNORDIC&teamId=&gameType=&timecode=`;
  const { body: gameData } = await got(url, { json: true, headers: { 'Content-type': 'application/json' } })

  return gameData.dates.map(gameDay => {
    return {
      day: moment(gameDay.date).format('dddd MMMM Do YYYY'),
      games: formatGames(gameDay.games)
    }
  })
}


export const formatGames = (games) : Game => {
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
      requiredOvertime: gameIsFinished && game.linescore.currentPeriodOrdinal !== '3rd',
      url: getHighlightsUrl(game.content.media.epg)
    }
  })
}

export const getHighlightsUrl = (epgs: Epg[]) : String => {
  let videoId
  for (let i = 0; i < epgs.length; i++) {
    const epg = epgs[i]

    if (epg.items.length) {
      switch (epg.title) {
        case 'Recap':
          videoId = epg.items[0].mediaPlaybackId || false;
          break;
        case 'Extended Highlights':
          videoId = epg.items[0].mediaPlaybackId || false;
          break;
      }
    }
  }
  return videoId ? `https://www.nhl.com/video/embed/c-${videoId}&autoplay=true` : null
}
