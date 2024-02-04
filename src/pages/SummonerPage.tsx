import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MultiTabLayout from "../Layouts/MultiTabLayout";
import { useSummonerInfo, useSummonerInfoById } from "../api/apis";
import Loading from "../components/Loading";
import MatchesComponent from "../components/MatchesComponent";
import { ILeagueEntry, ISummonerProfile } from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const { summonerName, tagName, id } = useParams();
  const [gameData, setGameData] = useState<ISummonerProfile>();
  const dataByName = useSummonerInfo(summonerName, tagName);
  const dataById = useSummonerInfoById(id);

  useEffect(() => {
    if (
      !dataByName.isLoading &&
      !dataByName.isValidating &&
      dataByName.data?.matches
    ) {
      setGameData(dataByName.data);
    }
  }, [dataByName.isLoading, dataByName.isValidating, dataByName.data?.matches]);

  useEffect(() => {
    if (
      !dataById.isLoading &&
      !dataById.isValidating &&
      dataById.data?.matches
    ) {
      setGameData(dataById.data);
    }
  }, [dataById.isLoading, dataById.isValidating, dataById.data?.matches]);

  const LeagueComponent = (props: ILeagueEntry) => {
    const qType = props.queueType === "RANKED_SOLO" ? "솔로 랭크" : "자유 랭크";

    const tier = getFullTierName(props.tier, props.rank);
    const ratio = Math.round((props.wins / (props.wins + props.losses)) * 100);
    return (
      <div className="summoner_league">
        <div className="league_queue_type">
          <span>{qType}</span>
        </div>
        <div className="league_detail">
          <div className="league_icon">
            <img src={`/${props.tier.toLowerCase()}.webp`} alt="리그 이미지" />
          </div>
          <div className="league">
            <span className="tier">{tier}</span>
            <span className="league_points">
              {props.tier !== "UNRANKED" ? `${props.leaguePoints}lp` : ""}
            </span>
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

  function SummonerProfile(data: ISummonerProfile) {
    return (
      <>
        <div className="summoner_summary_wrapper">
          <div className="summoner_profile">
            <div className="summoner_icon">
              <img src={data.profile.profileIcon} alt="소환사아이콘" />
              <span>{data.profile.summonerLevel}</span>
            </div>
            <div className="summoner_name">
              <span>{data.profile.summonerName}</span>
              <span className="summoner_tag">{`#${data.profile.tagLine}`}</span>
            </div>
          </div>
          <div className="summoner_league_container">
            {LeagueComponent(data.profile.soloLeagueEntry)}
            {LeagueComponent(data.profile.flexLeagueEntry)}
          </div>
        </div>
        <div className="multi_tab_wrapper">
          {gameData && (
            <MultiTabLayout
              tabList={["전체", "솔로 랭크", "자유 랭크", "일반", "기타"]}
              tabPageList={[
                <MatchesComponent data={gameData} q="ALL" />,
                <MatchesComponent data={gameData} q="SOLO_RANK_GAME" />,
                <MatchesComponent data={gameData} q="FLEX_RANK_GAME" />,
                <MatchesComponent data={gameData} q="QUICK_PLAY" />,
                <MatchesComponent data={gameData} />,
              ]}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div className="page_summoner">
      <div className="page_summoner_wrapper">
        {dataByName.isLoading || dataById.isLoading ? (
          <Loading width={48} />
        ) : dataByName.data ? (
          <SummonerProfile {...dataByName.data} />
        ) : dataById.data ? (
          <SummonerProfile {...dataById.data} />
        ) : (
          <div className="no_summoner_exists">
            존재하지 않는 소환사 입니다. 소환사 명을 다시 확인해 주세요.
          </div>
        )}
      </div>
    </div>
  );
}
