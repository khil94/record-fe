import {
  DUO_MATCH_TYPE_LIST,
  ERR_CODE,
  GAME_MODE_LIST,
  GAME_TYPE_LIST,
  LEADERBOARD_QUEUE_TYPE_LIST,
  LINE_LIST,
  QUEUE_ID_LIST,
  QUEUE_TYPE_LIST,
  RANK_NUMBER_LIST,
  TIER_TYPE_LIST,
} from "../constants/Enum";

export type IQueueType = (typeof QUEUE_TYPE_LIST)[number];
export type ITierType = (typeof TIER_TYPE_LIST)[number];
export type IRankNumber = (typeof RANK_NUMBER_LIST)[number];
export type IGameMode = (typeof GAME_MODE_LIST)[number];
export type IQueueId = (typeof QUEUE_ID_LIST)[number];
export type IGameType = (typeof GAME_TYPE_LIST)[number];
export type ILeaderBoardQueueTyep =
  (typeof LEADERBOARD_QUEUE_TYPE_LIST)[number];
export type ILineType = (typeof LINE_LIST)[number];
export type IDuoMatchType = (typeof DUO_MATCH_TYPE_LIST)[number];
export type IErrCode = keyof typeof ERR_CODE;

export interface ILeagueEntry {
  queueType: IQueueType;
  tier: ITierType;
  rank: IRankNumber;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface IProfile {
  puuid: string;
  gameName: string;
  tagLine: string;
  summonerName: string;
  summonerLevel: number;
  profileIcon: string;
  soloLeagueEntry: ILeagueEntry;
  flexLeagueEntry: ILeagueEntry;
}

export interface ISimpleParticipant {
  summonerId: string;
  summonerName: string;
  summonerLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  goldEarned: number;
  goldSpent: number;
  teamId: number;
  items: IItem[];
  spells: ISpell[];
  mainRune: IRune;
  subRune: IRune;
  champion: IChampion;
  championLevel: number;
  win: boolean;
}

export interface ISimpleMatch {
  matchId: string;
  gameMode: IGameMode;
  gameType: IGameType;
  queueId: IQueueId;
  participants: ISimpleParticipant[];
}

export interface ISummonerProfile {
  profile: IProfile;
  matches: ISimpleMatch[];
}

export interface IChampion {
  name: string;
  description: string;
  image: string;
}
export interface IItem {
  name: string;
  description: string;
  image: string;
}

export interface ISpell {
  name: string;
  description: string;
  image: string;
}

export interface IRune {
  name: string;
  description: string;
  image: string;
}

export interface IRanking {
  tier: string;
  queue: string;
  players: IPlayerRankingInfo[];
}

export interface IPlayerRankingInfo {
  [v: string]: string | number;
  summonerId: string;
  summonerName: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  loses: number;
}

export interface ILoginResp {
  accessToken: string;
  refreshToken: string;
  userInfo: IUserInfo;
}

export interface IUserInfo {
  userId: number;
  email: string;
  verified: boolean;
}

export interface IUser {
  auth: boolean;
}

export interface IError {
  errorCode: IErrCode;
  httpStatus: string;
  message: string;
  data: unknown;
}

export interface IDuoResp {
  myDuo: IDuoObj;
  duoList: IDuoObj[];
}
export interface IDuoObj {
  id: 0;
  userId: 0;
  gameName: string;
  tagLine: string;
  puuid: string;
  lines: ILineType[];
  tier: ITierType;
  wishLines: ILineType[];
  wishTiers: ITierType[];
  createdAt: string;
  expiredAt: string;
  tickets: IDuoTicket[];
  duoQueueId: IDuoQueueId;
  recentMatches: IDuoRecentMatch[];
  matched: boolean;
  memo: string;
}

export interface IDuoRecentMatch {
  championDto: IChampion;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
}

export interface IDuoDetailResp {
  duo: IDuoObj;
}

export interface IDuoTicket {
  id: number;
  userId: number;
  duoId: number;
  gameName: string;
  tagLine: string;
  lines: ILineType[];
  tier: ITierType;
  memo: string;
  createdAt: string;
  recentMatches: IDuoRecentMatch[];
  puuid: string;
}

export interface IDuoPost {
  gameName: string;
  tagLine: string;
  lines: ILineType[];
  wishLines: ILineType[];
  wishTiers: ITierType[];
  duoQueueId: IDuoQueueId;
  memo: string;
}

export type IDuoQueueId = Extract<
  IQueueId,
  "SOLO_RANK_GAME" | "FLEX_RANK_GAME" | "QUICK_PLAY"
>;

export type IPostQueueId = IDuoQueueId | "ALL";

export interface ITicketPost {
  gameName: string;
  tagLine: string;
  lines: ILineType[];
  memo: string;
}

export interface IMyDuoResp {
  myduo: IDuoObj;
}
