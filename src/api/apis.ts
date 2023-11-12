import {
  ILeaderBoardQueueTyep,
  IRanking,
  ISimpleMatch,
  ISummonerProfile,
} from "../types/types";
import API from "./api";

export const GetSummonerInfo = async (summonerName: string) => {
  const resp = await API.get<ISummonerProfile>(`/api/summoner/${summonerName}`);
  return resp;
};

export const GetGameList = async (puid: string, pageNumber: number) => {
  const resp = await API.get<ISimpleMatch[]>(`/api/matches/${puid}`, {
    params: {
      page: pageNumber,
    },
  });
  return resp;
};

export const GetRankingList = async (
  queueType: ILeaderBoardQueueTyep,
  pageNumber: number
) => {
  const resp = await API.get<IRanking>(`/api/leaderboard`, {
    params: {
      page: pageNumber,
      queue: queueType,
    },
  });
  return resp;
};
