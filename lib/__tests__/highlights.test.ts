import 'jest'
import { getHighlightsUrl } from '../services/highlights'

describe('Highlights', () => {
  let epgs, highlightsResult
  beforeEach(() => {
    highlightsResult = [
      {
        date: 'Friday November 2nd 2018',
        games: [
          {
            homeTeam: 'Arizona Coyotes',
            awayTeam: 'Carolina Hurricanes',
            homeGoals: 0,
            awayGoals: 0,
            homeWin: false,
            arena: 'Gila River Arena',
            date: '2018-11-03T02:00:00Z',
            winner: 'Carolina Hurricanes',
            gameFinished: false
          },
          {
            homeTeam: 'Vancouver Canucks',
            awayTeam: 'Colorado Avalanche',
            homeGoals: 0,
            awayGoals: 0,
            homeWin: false,
            arena: 'Rogers Arena',
            date: '2018-11-03T02:00:00Z',
            winner: 'Colorado Avalanche',
            gameFinished: false
          },
          {
            homeTeam: 'Winnipeg Jets',
            awayTeam: 'Florida Panthers',
            homeGoals: 0,
            awayGoals: 0,
            homeWin: false,
            arena: 'Hartwall Arena',
            date: '2018-11-02T18:00:00Z',
            winner: 'Florida Panthers',
            gameFinished: false
          }
        ],
        gameFinished: false
      },
      {
        date: 'Thursday November 1st 2018',
        games: [
          {
            homeTeam: 'San Jose Sharks',
            awayTeam: 'Columbus Blue Jackets',
            homeGoals: 1,
            awayGoals: 4,
            homeWin: false,
            arena: 'SAP Center at San Jose',
            date: '2018-11-02T02:30:00Z',
            winner: 'Columbus Blue Jackets',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62551103&autoplay=true'
          },
          {
            homeTeam: 'Los Angeles Kings',
            awayTeam: 'Philadelphia Flyers',
            homeGoals: 2,
            awayGoals: 5,
            homeWin: false,
            arena: 'STAPLES Center',
            date: '2018-11-02T02:30:00Z',
            winner: 'Philadelphia Flyers',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62550203&autoplay=true'
          },
          {
            homeTeam: 'Anaheim Ducks',
            awayTeam: 'New York Rangers',
            homeGoals: 2,
            awayGoals: 3,
            homeWin: false,
            arena: 'Honda Center',
            date: '2018-11-02T02:00:00Z',
            winner: 'New York Rangers',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62552203&autoplay=true',
            endedWith: 'SO'
          },
          {
            homeTeam: 'Edmonton Oilers',
            awayTeam: 'Chicago Blackhawks',
            homeGoals: 4,
            awayGoals: 0,
            homeWin: true,
            arena: 'Rogers Place',
            date: '2018-11-02T01:00:00Z',
            winner: 'Edmonton Oilers',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62547203&autoplay=true'
          },
          {
            homeTeam: 'Calgary Flames',
            awayTeam: 'Colorado Avalanche',
            homeGoals: 6,
            awayGoals: 5,
            homeWin: true,
            arena: 'Scotiabank Saddledome',
            date: '2018-11-02T01:00:00Z',
            winner: 'Calgary Flames',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62547403&autoplay=true'
          },
          {
            homeTeam: 'St. Louis Blues',
            awayTeam: 'Vegas Golden Knights',
            homeGoals: 5,
            awayGoals: 3,
            homeWin: true,
            arena: 'Enterprise Center',
            date: '2018-11-02T00:00:00Z',
            winner: 'St. Louis Blues',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62545203&autoplay=true'
          },
          {
            homeTeam: 'Tampa Bay Lightning',
            awayTeam: 'Nashville Predators',
            homeGoals: 1,
            awayGoals: 4,
            homeWin: false,
            arena: 'Amalie Arena',
            date: '2018-11-01T23:30:00Z',
            winner: 'Nashville Predators',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62545303&autoplay=true'
          },
          {
            homeTeam: 'Detroit Red Wings',
            awayTeam: 'New Jersey Devils',
            homeGoals: 4,
            awayGoals: 3,
            homeWin: true,
            arena: 'Little Caesars Arena',
            date: '2018-11-01T23:30:00Z',
            winner: 'Detroit Red Wings',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62543903&autoplay=true'
          },
          {
            homeTeam: 'Ottawa Senators',
            awayTeam: 'Buffalo Sabres',
            homeGoals: 4,
            awayGoals: 2,
            homeWin: true,
            arena: 'Canadian Tire Centre',
            date: '2018-11-01T23:30:00Z',
            winner: 'Ottawa Senators',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62543003&autoplay=true'
          },
          {
            homeTeam: 'Montréal Canadiens',
            awayTeam: 'Washington Capitals',
            homeGoals: 6,
            awayGoals: 4,
            homeWin: true,
            arena: 'Centre Bell',
            date: '2018-11-01T23:30:00Z',
            winner: 'Montréal Canadiens',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62541903&autoplay=true'
          },
          {
            homeTeam: 'New York Islanders',
            awayTeam: 'Pittsburgh Penguins',
            homeGoals: 3,
            awayGoals: 2,
            homeWin: true,
            arena: 'Barclays Center',
            date: '2018-11-01T23:00:00Z',
            winner: 'New York Islanders',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62539503&autoplay=true',
            endedWith: 'SO'
          },
          {
            homeTeam: 'Toronto Maple Leafs',
            awayTeam: 'Dallas Stars',
            homeGoals: 1,
            awayGoals: 2,
            homeWin: false,
            arena: 'Scotiabank Arena',
            date: '2018-11-01T23:00:00Z',
            winner: 'Dallas Stars',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62539803&autoplay=true'
          },
          {
            homeTeam: 'Florida Panthers',
            awayTeam: 'Winnipeg Jets',
            homeGoals: 2,
            awayGoals: 4,
            homeWin: false,
            arena: 'Hartwall Arena',
            date: '2018-11-01T18:00:00Z',
            winner: 'Winnipeg Jets',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62511803&autoplay=true'
          }
        ],
        gameFinished: true
      },
      {
        date: 'Wednesday October 31st 2018',
        games: [
          {
            homeTeam: 'Vancouver Canucks',
            awayTeam: 'Chicago Blackhawks',
            homeGoals: 4,
            awayGoals: 2,
            homeWin: true,
            arena: 'Rogers Arena',
            date: '2018-11-01T02:00:00Z',
            winner: 'Vancouver Canucks',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62495803&autoplay=true'
          }
        ],
        gameFinished: true
      },
      {
        date: 'Tuesday October 30th 2018',
        games: [
          {
            homeTeam: 'San Jose Sharks',
            awayTeam: 'New York Rangers',
            homeGoals: 3,
            awayGoals: 4,
            homeWin: false,
            arena: 'SAP Center at San Jose',
            date: '2018-10-31T02:30:00Z',
            winner: 'New York Rangers',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62479703&autoplay=true',
            endedWith: 'SO'
          },
          {
            homeTeam: 'Anaheim Ducks',
            awayTeam: 'Philadelphia Flyers',
            homeGoals: 2,
            awayGoals: 3,
            homeWin: false,
            arena: 'Honda Center',
            date: '2018-10-31T02:00:00Z',
            winner: 'Philadelphia Flyers',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62478103&autoplay=true'
          },
          {
            homeTeam: 'Arizona Coyotes',
            awayTeam: 'Ottawa Senators',
            homeGoals: 5,
            awayGoals: 1,
            homeWin: true,
            arena: 'Gila River Arena',
            date: '2018-10-31T02:00:00Z',
            winner: 'Arizona Coyotes',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62478903&autoplay=true'
          },
          {
            homeTeam: 'Edmonton Oilers',
            awayTeam: 'Minnesota Wild',
            homeGoals: 3,
            awayGoals: 4,
            homeWin: false,
            arena: 'Rogers Place',
            date: '2018-10-31T01:00:00Z',
            winner: 'Minnesota Wild',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62476803&autoplay=true'
          },
          {
            homeTeam: 'Nashville Predators',
            awayTeam: 'Vegas Golden Knights',
            homeGoals: 4,
            awayGoals: 1,
            homeWin: true,
            arena: 'Bridgestone Arena',
            date: '2018-10-31T00:00:00Z',
            winner: 'Nashville Predators',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62472903&autoplay=true'
          },
          {
            homeTeam: 'Tampa Bay Lightning',
            awayTeam: 'New Jersey Devils',
            homeGoals: 8,
            awayGoals: 3,
            homeWin: true,
            arena: 'Amalie Arena',
            date: '2018-10-30T23:30:00Z',
            winner: 'Tampa Bay Lightning',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62472403&autoplay=true'
          },
          {
            homeTeam: 'Montréal Canadiens',
            awayTeam: 'Dallas Stars',
            homeGoals: 1,
            awayGoals: 4,
            homeWin: false,
            arena: 'Centre Bell',
            date: '2018-10-30T23:30:00Z',
            winner: 'Dallas Stars',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62472303&autoplay=true'
          },
          {
            homeTeam: 'Columbus Blue Jackets',
            awayTeam: 'Detroit Red Wings',
            homeGoals: 3,
            awayGoals: 5,
            homeWin: false,
            arena: 'Nationwide Arena',
            date: '2018-10-30T23:00:00Z',
            winner: 'Detroit Red Wings',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62473803&autoplay=true'
          },
          {
            homeTeam: 'Carolina Hurricanes',
            awayTeam: 'Boston Bruins',
            homeGoals: 2,
            awayGoals: 3,
            homeWin: false,
            arena: 'PNC Arena',
            date: '2018-10-30T23:00:00Z',
            winner: 'Boston Bruins',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62470703&autoplay=true'
          },
          {
            homeTeam: 'Pittsburgh Penguins',
            awayTeam: 'New York Islanders',
            homeGoals: 3,
            awayGoals: 6,
            homeWin: false,
            arena: 'PPG Paints Arena',
            date: '2018-10-30T23:00:00Z',
            winner: 'New York Islanders',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62465803&autoplay=true'
          },
          {
            homeTeam: 'Buffalo Sabres',
            awayTeam: 'Calgary Flames',
            homeGoals: 1,
            awayGoals: 2,
            homeWin: false,
            arena: 'KeyBank Center',
            date: '2018-10-30T23:00:00Z',
            winner: 'Calgary Flames',
            gameFinished: true,
            url: 'https://www.nhl.com/video/embed/c-62473703&autoplay=true',
            endedWith: 'OT'
          }
        ],
        gameFinished: true
      }
    ]
    epgs = [
      {
        title: 'NHLTV',
        platform: 'web',
        items: [
          {
            guid: 'f6f67e5f-3fe5-4744-be39-dd0cb7e79b2a',
            mediaState: 'MEDIA_OFF',
            mediaPlaybackId: '62111503',
            mediaFeedType: 'HOME',
            callLetters: '',
            eventId: '221-2001042',
            language: 'eng',
            freeGame: false,
            feedName: '',
            gamePlus: false
          },
          {
            guid: '814481e8-10c5-46f9-a086-a7c5b428ad41',
            mediaState: 'MEDIA_OFF',
            mediaPlaybackId: '62111603',
            mediaFeedType: 'AWAY',
            callLetters: '',
            eventId: '221-2001042',
            language: 'eng',
            freeGame: false,
            feedName: '',
            gamePlus: false
          },
          {
            guid: '7c543b8c-9e53-4f30-bc56-e36386aef591',
            mediaState: 'MEDIA_OFF',
            mediaPlaybackId: '62112103',
            mediaFeedType: 'COMPOSITE',
            callLetters: '',
            eventId: '221-2001042',
            language: 'eng',
            freeGame: false,
            feedName: 'Multi-Cam 1',
            gamePlus: false
          }
        ]
      },
      {
        title: 'Recap',
        items: [
          {
            mediaState: 'MEDIA_OFF',
            mediaPlaybackId: '62111703',
            mediaFeedType: 'HOME',
            callLetters: '',
            eventId: '221-2001042',
            language: 'eng',
            freeGame: false,
            feedName: '',
            gamePlus: false
          },
          {
            mediaState: 'MEDIA_OFF',
            mediaPlaybackId: '62111803',
            mediaFeedType: 'AWAY',
            callLetters: '',
            eventId: '221-2001042',
            language: 'eng',
            freeGame: false,
            feedName: '',
            gamePlus: false
          }
        ]
      },
      {
        title: 'Extended Highlights',
        topicList: '299968858',
        items: []
      },
      {
        title: 'Recap',
        topicList: '299968858',
        items: []
      },
      {
        title: 'Power Play',
        items: []
      }
    ]
  })

  describe('#getHightlightsUrl', () => {
    it('Returns the correct url', () => {
      expect(getHighlightsUrl(epgs)).toEqual(
        'https://www.nhl.com/video/embed/c-62111703&autoplay=true'
      )
    })
  })
})
