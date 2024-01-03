import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MultiTabLayout from "../Layouts/MultiTabLayout";
import { GetGameList, useSummonerInfo, useSummonerInfoById } from "../api/apis";
import Loading from "../components/Loading";
import MatchComponent from "../components/MatchComponent";
import UserRecentInfoComponent from "../components/UserRecentInfoComponent";
import {
  ILeagueEntry,
  IProfile,
  IQueueId,
  ISimpleMatch,
  ISimpleParticipant,
  ISummonerProfile,
} from "../types/types";
import { getFullTierName } from "../utils/generalFunctions";
import "./SummonerPage.scss";

export default function SummonerPage() {
  const { summonerName, tagName, id } = useParams();
  const [gameListData, setGameListData] = useState<ISimpleMatch[]>([]);
  const [summonerProfileData, setSummonerProfileData] = useState<IProfile>();
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const dataByName = useSummonerInfo(summonerName, tagName);
  const dataById = useSummonerInfoById(id);

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
    if (
      !dataByName.isLoading &&
      !dataByName.isValidating &&
      dataByName.data?.matches
    ) {
      setGameListData(dataByName.data.matches);
      setSummonerProfileData(dataByName.data.profile);
    }
  }, [
    dataByName.isLoading,
    dataByName.isValidating,
    dataByName.data?.matches,
    dataByName.data?.profile,
  ]);

  useEffect(() => {
    if (
      !dataById.isLoading &&
      !dataById.isValidating &&
      dataById.data?.matches
    ) {
      setGameListData(dataById.data.matches);
      setSummonerProfileData(dataById.data.profile);
    }
  }, [
    dataById.isLoading,
    dataById.isValidating,
    dataById.data?.matches,
    dataById.data?.profile,
  ]);

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

  function MatchComp(
    targetData: ISimpleMatch[],
    profileData?: IProfile,
    v?: IQueueId
  ) {
    const target = v ? targetData.filter((t) => t.queueId === v) : targetData;
    const userName = profileData?.summonerName || "";
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
        (t) => t.summonerName.toLowerCase() === userName.toLowerCase()
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
                  getMoreGameList(profileData?.puuid || "");
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
              MatchComp(gameListData, summonerProfileData),
              MatchComp(gameListData, summonerProfileData, "SOLO_RANK_GAME"),
              MatchComp(gameListData, summonerProfileData, "FLEX_RANK_GAME"),
              MatchComp(
                gameListData.filter(
                  (v) =>
                    v.queueId !== "FLEX_RANK_GAME" &&
                    v.queueId !== "SOLO_RANK_GAME"
                ),
                summonerProfileData
              ),
            ]}
          />
        </div>
      </>
    );
  }

  return (
    <div className="page_summoner">
      <div className="page_summoner_wrapper">
        {dataByName.isLoading || dataById.isLoading ? (
          <Loading width={18} />
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
