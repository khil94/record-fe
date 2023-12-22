import useSWR from "swr";
import {
  ILeaderBoardQueueTyep,
  ILoginResp,
  IRanking,
  ISimpleMatch,
  ISummonerProfile,
} from "../types/types";
import API from "./api";

export const GetGameList = async (puid: string, pageNumber: number) => {
  const resp = await API.get<ISimpleMatch[]>(`/matches/${puid}`, {
    params: {
      page: pageNumber,
    },
  });
  return resp;
};

export function useRankingInfo(
  queueType: ILeaderBoardQueueTyep,
  pageNumber: number
) {
  const resp = useSWR(
    [`/leaderboard`, queueType, pageNumber],
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

export function useSummonerInfo(summonerName: string, tagName: string) {
  const resp = useSWR(
    `/summoner/${summonerName}-${tagName}`,
    (url: string) => {
      return API.get<ISummonerProfile>(url).then((res) => res.data);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return resp;
}

export const PostLogin = async (email: string, password: string) => {
  const resp = await API.post<ILoginResp>(`/user/login`, {
    email,
    password,
  });
  return resp;
};

export const PostRegister = async (
  email: string,
  password: string,
  passwordCheck: string
) => {
  const resp = await API.post("/user", {
    email,
    password,
    passwordCheck,
  });
  return resp;
};
