import API from "./api";

export const GetSummonerInfo = async (summonerName: string) => {
  const resp = await API.get(`/api/summoner/${summonerName}`);
  return resp;
};

export const GetGameList = async (puid: string, pageNumber: number) => {
  const resp = await API.get(`/api/matches/${puid}`, {
    params: {
      page: pageNumber,
    },
  });
  return resp;
};
