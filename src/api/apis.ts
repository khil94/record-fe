import useSWR from "swr";
import {
  IDuoDetailResp,
  IDuoMatchType,
  IDuoPost,
  IDuoResp,
  ILeaderBoardQueueTyep,
  ILoginResp,
  IPostQueueId,
  IRanking,
  ISimpleMatch,
  ISummonerProfile,
  ITicketPost,
  IUserInfo,
} from "../types/types";
import API from "./api";

export const GetGameList = async (
  puid: string,
  pageNumber: number,
  queue: IPostQueueId
) => {
  const resp = await API.get<ISimpleMatch[]>(`/matches/${puid}`, {
    params: {
      page: pageNumber,
      queue,
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
      shouldRetryOnError: false,
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
      shouldRetryOnError: false,
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

export const useDuoList = (
  page: number,
  match: IDuoMatchType,
  queue: IPostQueueId
) => {
  const resp = useSWR(
    ["/duo", page, match, queue],
    ([url, page, match, queue]) => {
      return API.get<IDuoResp>(url, {
        params: { page, match, queue },
      });
    }
  );
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

export const PostAcceptTicket = async (duoId: number, ticketId: number) => {
  const resp = await API.post(`/duo/${duoId}/${ticketId}/accept`);
  return resp;
};

export const GetMe = async () => {
  const resp = await API.get<IUserInfo>("/user/me");
  return resp;
};
