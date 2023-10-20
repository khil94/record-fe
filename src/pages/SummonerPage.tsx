import { useState } from "react";
import { TEST_ITEM } from "../constants/testItem";
import { ILeagueEntry, ISummonerProfile } from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const [data, setData] = useState<ISummonerProfile>(TEST_ITEM);

  // useEffect(()=>{
  //   const getSummonerData = async()=>{
  //     const resp = await GetGameListBySummonerName('');
  //     if(resp.data){
  //       setData(resp.data);
  //     }
  //   }
  //   getSummonerData();
  // },[]) api붙이고 테스트

  const LeagueComponent = (props: ILeagueEntry) => {
    const qType = props.queueType === "RANKED_SOLO" ? "솔로 랭크" : "자유 랭크";
    // 우선은 두개만
    const tier = getFullTierName(props.tier, props.rank);
    const ratio = Math.round((props.wins / (props.wins + props.losses)) * 100);
    return (
      <div className="summoner_league">
        <div className="league_queue_type">
          <span>{qType}</span>
        </div>
        <div className="league_detail">
          <div className="league_icon">
            <img src="" alt="리그 이미지" />
          </div>
          <div className="league">
            <span>{tier}</span>
            <span>{props.leaguePoints} LP</span>
          </div>
          <div className="league_win_lose">
            <div className="win_lose">
              <span>{props.wins}승</span>
              <span>{props.losses}패</span>
            </div>
            <div className="ratio">
              <span>{Number.isNaN(ratio) ? "" : `승률 ${ratio}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page_summoner">
      <div className="summoner_profile">
        <div className="summoner_icon">
          <img
            // src={data.profile.profileIcon}
            src={
              "//ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/4379.png"
            }
            alt="소환사아이콘"
          />
          <span>{data.profile.summonerLevel}</span>
        </div>
        <div>
          <span>{data.profile.summonerName}</span>
          <button type="button">전적갱신</button>
        </div>
      </div>
      <div className="summoner_league_container">
        {LeagueComponent(data.profile.soloLeagueEntry)}
        {LeagueComponent(data.profile.flexLeagueEntry)}
      </div>
    </div>
  );
}
