import useSWR from "swr";
import {
  IDuoDetailResp,
  IDuoPost,
  IDuoResp,
  ILeaderBoardQueueTyep,
  ILoginResp,
  IRanking,
  ISimpleMatch,
  ISummonerProfile,
  ITicketPost,
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

export function useSummonerInfoById(summonerId?: string) {
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

export function useSummonerInfoByPuuid(puuid?: string) {
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

export const DeleteUser = async () => {
  const resp = await API.delete("/user");
  return resp;
};

export const getDuoList = async (page: number) => {
  const resp = await API.get<IDuoResp>("/duo", {
    params: { page, filter: "ALL" },
  });

  return resp;
};

export const PostDuo = async (data: IDuoPost) => {
  const resp = await API.post("/duo", { ...data });
  return resp;
};

export const GetDuoDetail = async (duoId: number) => {
  const resp = await API.get<IDuoDetailResp>(`/duo/${duoId}`);
  return resp;
};

export const PostTicket = async (duoId: number, data: ITicketPost) => {
  const resp = await API.post(`/duo/${duoId}`, { ...data });
  return resp;
};
