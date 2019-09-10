import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * The `Upload` scalar type represents a file upload promise that resolves an
   * object containing `stream`, `filename`, `mimetype` and `encoding`.
   **/
  Upload: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Game = {
  __typename?: 'Game'
  homeTeam?: Maybe<Scalars['String']>
  awayTeam?: Maybe<Scalars['String']>
  homeGoals?: Maybe<Scalars['Int']>
  awayGoals?: Maybe<Scalars['Int']>
  homeWin?: Maybe<Scalars['Boolean']>
  arena?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['String']>
  gameIsFinished?: Maybe<Scalars['Boolean']>
  requiredOvertime?: Maybe<Scalars['Boolean']>
  url?: Maybe<Scalars['String']>
  stars?: Maybe<Array<Maybe<PlayerInfo>>>
  scorers?: Maybe<Array<Maybe<Goal>>>
}

export type Goal = {
  __typename?: 'Goal'
  scorer?: Maybe<Player>
  assist?: Maybe<Player>
  homeTeamScored?: Maybe<Scalars['Boolean']>
  gwg?: Maybe<Scalars['Boolean']>
  emptyNet?: Maybe<Scalars['Boolean']>
  strength?: Maybe<Scalars['String']>
  period?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  standing?: Maybe<Scalars['String']>
}

export type Highlights = {
  __typename?: 'Highlights'
  day?: Maybe<Scalars['String']>
  games?: Maybe<Array<Maybe<Game>>>
}

export type Matchup = {
  __typename?: 'Matchup'
  team1?: Maybe<Team>
  team2?: Maybe<Team>
}

export type Player = {
  __typename?: 'Player'
  player?: Maybe<PlayerInfo>
  seasonTotal?: Maybe<Scalars['Int']>
}

export type PlayerInfo = {
  __typename?: 'PlayerInfo'
  id?: Maybe<Scalars['Int']>
  fullName?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['Int']>
}

export type Playoffs = {
  __typename?: 'Playoffs'
  eastern?: Maybe<Array<Maybe<Matchup>>>
  western?: Maybe<Array<Maybe<Matchup>>>
}

export type Query = {
  __typename?: 'Query'
  getPlayoffs?: Maybe<Playoffs>
  fetchHighlights?: Maybe<Array<Maybe<Highlights>>>
}

export type QueryFetchHighlightsArgs = {
  from?: Maybe<Scalars['String']>
  to?: Maybe<Scalars['String']>
}

export type Team = {
  __typename?: 'Team'
  team?: Maybe<TeamInfo>
  leagueRank?: Maybe<Scalars['String']>
  leagueL10Rank?: Maybe<Scalars['String']>
  leagueRoadRank?: Maybe<Scalars['String']>
  leagueHomeRank?: Maybe<Scalars['String']>
  wildCardRank?: Maybe<Scalars['String']>
}

export type TeamInfo = {
  __typename?: 'TeamInfo'
  name?: Maybe<Scalars['String']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Playoffs: ResolverTypeWrapper<Playoffs>
  Matchup: ResolverTypeWrapper<Matchup>
  Team: ResolverTypeWrapper<Team>
  TeamInfo: ResolverTypeWrapper<TeamInfo>
  String: ResolverTypeWrapper<Scalars['String']>
  Highlights: ResolverTypeWrapper<Highlights>
  Game: ResolverTypeWrapper<Game>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  PlayerInfo: ResolverTypeWrapper<PlayerInfo>
  Goal: ResolverTypeWrapper<Goal>
  Player: ResolverTypeWrapper<Player>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Playoffs: Playoffs
  Matchup: Matchup
  Team: Team
  TeamInfo: TeamInfo
  String: Scalars['String']
  Highlights: Highlights
  Game: Game
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  PlayerInfo: PlayerInfo
  Goal: Goal
  Player: Player
  CacheControlScope: CacheControlScope
  Upload: Scalars['Upload']
}

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars['Int']>>
    scope?: Maybe<Maybe<CacheControlScope>>
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']
> = {
  homeTeam?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  awayTeam?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  homeGoals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  awayGoals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  homeWin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  arena?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameIsFinished?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  requiredOvertime?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  stars?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PlayerInfo']>>>,
    ParentType,
    ContextType
  >
  scorers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Goal']>>>,
    ParentType,
    ContextType
  >
}

export type GoalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Goal'] = ResolversParentTypes['Goal']
> = {
  scorer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>
  assist?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>
  homeTeamScored?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  gwg?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  emptyNet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  strength?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  period?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  standing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type HighlightsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Highlights'] = ResolversParentTypes['Highlights']
> = {
  day?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  games?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Game']>>>,
    ParentType,
    ContextType
  >
}

export type MatchupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Matchup'] = ResolversParentTypes['Matchup']
> = {
  team1?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>
  team2?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>
}

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']
> = {
  player?: Resolver<
    Maybe<ResolversTypes['PlayerInfo']>,
    ParentType,
    ContextType
  >
  seasonTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}

export type PlayerInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayerInfo'] = ResolversParentTypes['PlayerInfo']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}

export type PlayoffsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Playoffs'] = ResolversParentTypes['Playoffs']
> = {
  eastern?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Matchup']>>>,
    ParentType,
    ContextType
  >
  western?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Matchup']>>>,
    ParentType,
    ContextType
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getPlayoffs?: Resolver<
    Maybe<ResolversTypes['Playoffs']>,
    ParentType,
    ContextType
  >
  fetchHighlights?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Highlights']>>>,
    ParentType,
    ContextType,
    QueryFetchHighlightsArgs
  >
}

export type TeamResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']
> = {
  team?: Resolver<Maybe<ResolversTypes['TeamInfo']>, ParentType, ContextType>
  leagueRank?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  leagueL10Rank?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  leagueRoadRank?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  leagueHomeRank?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  wildCardRank?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
}

export type TeamInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TeamInfo'] = ResolversParentTypes['TeamInfo']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  Game?: GameResolvers<ContextType>
  Goal?: GoalResolvers<ContextType>
  Highlights?: HighlightsResolvers<ContextType>
  Matchup?: MatchupResolvers<ContextType>
  Player?: PlayerResolvers<ContextType>
  PlayerInfo?: PlayerInfoResolvers<ContextType>
  Playoffs?: PlayoffsResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Team?: TeamResolvers<ContextType>
  TeamInfo?: TeamInfoResolvers<ContextType>
  Upload?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>
