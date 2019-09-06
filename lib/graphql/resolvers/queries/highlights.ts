import * as got from 'got'
import * as moment from 'moment'
import * as queryString from 'query-string'
import config from '../../../config'
import { formatGames } from '../../../services/highlights'
import { QueryResolvers } from '../../../__generated__/pokechecked'

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
      'schedule.teams,schedule.linescore,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content',
  }

  const url = `${config.nhl.baseUrl}/schedule?${queryString.stringify(params)}`

  const { body: gameData } = await got(url, {
    json: true,
    headers: { 'Content-type': 'application/json' },
  })

  return gameData.dates.map(gameDay => {
    return {
      day: moment(gameDay.date).format('dddd MMMM Do YYYY'),
      games: formatGames(gameDay.games),
    }
  })
}
