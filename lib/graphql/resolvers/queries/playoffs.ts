import * as got from 'got'
import { QueryResolvers } from '../../../__generated__/pokechecked'
import { buildPlayOff } from '../../../services/playoffs'
import config from '../../../config'

const getSeason = () => {
  const d = new Date(),
    year = d.getFullYear()

  if (d.getMonth() >= 9) {
    return year + '' + (year + 1)
  } else {
    return year - 1 + '' + year
  }
}

export const getPlayoffs: QueryResolvers['getPlayoffs'] = async () => {
  const season = getSeason()
  const url = `${config.nhl.baseUrl}/standings/wildCardWithLeaders?expand=standings.team&season=${season}`

  const { body: playoffData } = await got(url, {
    json: true,
    headers: { 'Content-type': 'application/json' }
  })

  return buildPlayOff(playoffData)
}
