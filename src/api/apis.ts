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

export function useSummonerInfo(summonerName?: string, tagName?: string) {
  const resp = useSWR(
    summonerName && tagName ? `/summoner/${summonerName}-${tagName}` : null,
    (url: string) => {
      return API.get<ISummonerProfile>(url).then((res) => res.data);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return resp;
}

export function useSummonerInfoById(summonerId: string) {
  const resp = useSWR(
    summonerId ? `/summoner/summonerId/${summonerId}` : null,
    (url: string) => {
      return API.get<ISummonerProfile>(url).then((res) => res.data);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return resp;
}

export function useSummonerInfoByPuuid(puuid: string) {
  const resp = useSWR(
    puuid ? `/summoner/puuid/${puuid}` : null,
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

export const APITEST = async () => {
  const resp = await API.post("/user/auth/test");
  return resp;
};

export const PostLoginTest = async (email: string, password: string) => {
  const resp = await API.post<ILoginResp>(`/user/login/test`, {
    email,
    password,
  });
  return resp;
};

export const PostRefresh = async () => {
  const resp = await API.post<ILoginResp>("/user/refresh");
  return resp;
};

export const PutVerifyEmail = async (verificationCode: string) => {
  const resp = await API.put("/user/verify", {
    verificationCode,
  });
  return resp;
};
