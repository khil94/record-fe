import {
  GAME_MODE_LIST,
  GAME_TYPE_LIST,
  MENU_LIST,
  QUEUE_ID_LIST,
  QUEUE_TYPE_LIST,
  RANK_NUMBER_LIST,
  TIER_TYPE_LIST,
} from "../constants/Enum";

export type IMenu = (typeof MENU_LIST)[number];
export type IQueueType = (typeof QUEUE_TYPE_LIST)[number];
export type ITierType = (typeof TIER_TYPE_LIST)[number];
export type IRankNumber = (typeof RANK_NUMBER_LIST)[number];
export type IGameMode = (typeof GAME_MODE_LIST)[number];
export type IQueueId = (typeof QUEUE_ID_LIST)[number];
export type IGameType = (typeof GAME_TYPE_LIST)[number];

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
  summonerName: string;
  summonerLevel: number;
  profileIcon: string;
  soloLeagueEntry: ILeagueEntry;
  flexLeagueEntry: ILeagueEntry;
}

export interface ISimpleParticipant {
  summonerName: string;
  summonerLevel: number;
  championLevel: number;
  lane: string;
  role: string;
  teamId: number;
  kills: number;
  deaths: number;
  assists: number;
  summoner1Casts: number;
  summoner2Casts: number;
  items: IItem[];
  spells: ISpell[];
  mainRune: IRune;
  subRune: IRune;
  champion: IChampion;
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
  plaintext: string;
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
  summonerId: string;
  summonerName: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  loses: number;
}
