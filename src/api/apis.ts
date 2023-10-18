import API from "./api";

export const GetGameListBySummonerName = async (summonerName: string) => {
  const resp = await API.get(`summoner/${summonerName}`);
  return resp;
};
