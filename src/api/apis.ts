import useSWR from "swr";
import {
  ILeaderBoardQueueTyep,
  IRanking,
  ISimpleMatch,
  ISummonerProfile,
} from "../types/types";
import API from "./api";

export const commonFetcher = (url: string) =>
  API.get(url).then((res) => res.data);

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

export function useRankingInfo(
  queueType: ILeaderBoardQueueTyep,
  pageNumber: number
) {
  const resp = useSWR(
    [`/api/leaderboard`, queueType, pageNumber],
    ([url, queueType, pageNumber]) => {
      return API.get<IRanking>(url, {
        params: {
          page: pageNumber,
          queue: queueType,
        },
      }).then((res) => res.data);
    },
    {
      revalidateOnFocus: false,
    }
  );
  return resp;
}

export function useSummonerInfo(summonerName: string) {
  const resp = useSWR(
    `/api/summoner/${summonerName}`,
    (url: string) => {
      return API.get<ISummonerProfile>(url).then((res) => res.data);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return resp;
}
