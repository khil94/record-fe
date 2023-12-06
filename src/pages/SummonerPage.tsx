import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MultiTabLayout from "../Layouts/MultiTabLayout";
import { GetGameList, useSummonerInfo } from "../api/apis";
import Loading from "../components/Loading";
import MatchComponent from "../components/MatchComponent";
import UserRecentInfoComponent from "../components/UserRecentInfoComponent";
import { ILeagueEntry, ISimpleMatch, ISimpleParticipant } from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const { summonerName } = useParams();
  const [gameListData, setGameListData] = useState<ISimpleMatch[]>([]);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const { data, isLoading, isValidating } = useSummonerInfo(summonerName || "");
  const pageNumber = useRef(1);

  const getMoreGameList = async (puid: string) => {
    const targetNumber = pageNumber.current + 1;
    const gameData = await GetGameList(puid, targetNumber);
    if (gameData) {
      setGameListData([...gameListData, ...gameData.data]);
      pageNumber.current = pageNumber.current + 1;
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isValidating && data?.matches) {
      setGameListData(data.matches);
    }
  }, [isLoading, isValidating, data?.matches]);

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
            <img src={`/${props.tier.toLowerCase()}.webp`} alt="리그 이미지" />
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

  function MatchComp(matchData: ISimpleMatch[], userName: string) {
    const target = matchData;
    const temp: ISimpleParticipant[] = [];

    if (target.length === 0) {
      return (
        <div className="summoner_detail_wrapper">
          매칭기록이 존재하지 않습니다.
        </div>
      );
    }
    target.forEach((v) => {
      const ttarget = v.participants.find(
        (t) => t.summonerName.toLowerCase() === summonerName
      );
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
      <div className="page_summoner_wrapper">
        {isLoading ? (
          <Loading width={32} />
        ) : data ? (
          <>
            <div className="summoner_summary_wrapper">
              <div className="summoner_profile">
                <div className="summoner_icon">
                  <img src={data.profile.profileIcon} alt="소환사아이콘" />
                  <span>{data.profile.summonerLevel}</span>
                </div>
                <div className="summoner_name">
                  <span>{data.profile.summonerName}</span>
                </div>
              </div>
              <div className="summoner_league_container">
                {LeagueComponent(data.profile.soloLeagueEntry)}
                {LeagueComponent(data.profile.flexLeagueEntry)}
              </div>
            </div>
            <div className="multi_tab_wrapper">
              <MultiTabLayout
                tabList={["전체", "솔로 랭크", "자유 랭크", "기타"]}
                tabPageList={[
                  MatchComp(gameListData, data.profile.summonerName),
                  MatchComp(
                    gameListData.filter((v) => v.queueId === "SOLO_RANK_GAME"),
                    data.profile.summonerName
                  ),
                  MatchComp(
                    gameListData.filter((v) => v.queueId === "FLEX_RANK_GAME"),
                    data.profile.summonerName
                  ),
                  MatchComp(
                    gameListData.filter(
                      (v) =>
                        v.queueId !== "FLEX_RANK_GAME" &&
                        v.queueId !== "SOLO_RANK_GAME"
                    ),
                    data.profile.summonerName
                  ),
                ]}
              />
            </div>
          </>
        ) : (
          <div className="no_summoner_exists">
            존재하지 않는 소환사 입니다. 소환사 명을 다시 확인해 주세요.
          </div>
        )}
      </div>
    </div>
  );
}
