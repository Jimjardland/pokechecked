const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    port: 4000,
    nhl: {
      baseUrl: 'https://statsapi.web.nhl.com/api/v1/'
    }
  }
})

export default {
  port: config.get('port'),
  nhl: config.get('nhl')
}
