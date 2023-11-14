import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MultiTabLayout from "../Layouts/MultiTabLayout";
import { GetGameList, GetSummonerInfo } from "../api/apis";
import Loading from "../components/Loading";
import MatchComponent from "../components/MatchComponent";
import UserRecentInfoComponent from "../components/UserRecentInfoComponent";
import {
  ILeagueEntry,
  IQueueId,
  ISimpleMatch,
  ISimpleParticipant,
  ISummonerProfile,
} from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const { summonerName } = useParams();
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<ISummonerProfile>();
  const [gameListData, setGameListData] = useState<ISimpleMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const pageNumber = useRef(1);

  useEffect(() => {
    setUserName(summonerName!);
    const getSummonerData = async () => {
      setIsLoading(true);
      if (summonerName) {
        const resp = await GetSummonerInfo(summonerName);
        if (resp.data) {
          setData(resp.data);
          setGameListData(resp.data.matches);
        }
      } else {
        Error("없는디요");
      }
      setIsLoading(false);
    };
    getSummonerData();
  }, [summonerName]);

  const getMoreGameList = async (puid: string) => {
    const targetNumber = pageNumber.current + 1;
    const gameData = await GetGameList(puid, targetNumber);
    if (gameData) {
      setGameListData([...gameListData, ...gameData.data]);
      pageNumber.current = pageNumber.current + 1;
      setIsMoreLoading(false);
    }
  };

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
            <img src={`/public/${props.tier}.webp`} alt="리그 이미지" />
          </div>
          <div className="league">
            <span className="tier">{tier}</span>
            <span className="league_points">
              {props.tier !== "UNRANKED" ? `${props.leaguePoints}lp` : ""}
            </span>
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

  function TestComp(matchData: ISimpleMatch[], queueId?: IQueueId) {
    const target = queueId
      ? matchData.filter((v) => v.queueId === queueId)
      : matchData;
    const temp: ISimpleParticipant[] = [];
    target.forEach((v) => {
      const ttarget = v.participants.find((t) => t.summonerName === userName);
      if (ttarget) {
        temp.push(ttarget);
      }
    });
    return (
      <div className="summoner_detail_wrapper">
        <UserRecentInfoComponent userData={temp} />
        <div className="matches_container">
          {target.map((v) => {
            return (
              <MatchComponent
                key={v.matchId}
                matchData={v}
                userName={userName}
              />
            );
          })}
          <div className="more_match">
            {isMoreLoading ? (
              <Loading width={18} />
            ) : (
              <button
                onClick={() => {
                  setIsMoreLoading(true);
                  getMoreGameList(data!.profile.puuid);
                }}
                type="button"
              >
                더보기
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page_summoner">
      {data && !isLoading ? (
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
          <div>
            <MultiTabLayout
              tabList={["전체", "솔로 랭크"]}
              tabPageList={[
                TestComp(data.matches),
                TestComp(
                  data.matches.filter((v) => v.queueId === "SOLO_RANK_GAME")
                ),
              ]}
            />
          </div>
        </>
      ) : (
        <Loading width={32} />
      )}
    </div>
  );
}
