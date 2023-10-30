import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetGameListBySummonerName } from "../api/apis";
import MatchComponent from "../components/MatchComponent";
import { ILeagueEntry, ISummonerProfile } from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const { summonerName } = useParams();
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<ISummonerProfile>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserName(summonerName!);
    const getSummonerData = async () => {
      setIsLoading(true);
      if (summonerName) {
        const resp = await GetGameListBySummonerName(summonerName);
        if (resp.data) {
          setData(resp.data);
        }
      } else {
        Error("없는디요");
      }
      setIsLoading(false);
    };
    getSummonerData();
  }, [summonerName]);

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
            <span>{props.leaguePoints}</span>
            {/* 위부분은 실제로 unranked인 유저의 정보가 어떻게 들어오는지 확인하고 
            수정해야하는 부분이다. 승률또한 마찬가지. UNRANKED면 승률, LP는 보여주지도 ㅇ말아야 한다 */}
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
      {data && !isLoading && (
        <>
          <div className="summoner_profile">
            <div className="summoner_icon">
              <img src={data.profile.profileIcon} alt="소환사아이콘" />
              <span>{data.profile.summonerLevel}</span>
            </div>
            <div className="summoner_name">
              <span>{data.profile.summonerName}</span>
              <button type="button">전적갱신</button>
            </div>
          </div>
          <div className="summoner_league_container">
            {LeagueComponent(data.profile.soloLeagueEntry)}
            {LeagueComponent(data.profile.flexLeagueEntry)}
          </div>
          <div className="matches_container">
            {data.matches.map((v) => {
              return (
                <MatchComponent
                  key={v.matchId}
                  matchData={v}
                  userName={userName}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
