import React, { useEffect, useRef, useState } from "react";
import { GetGameList } from "../api/apis";
import {
  IPostQueueId,
  ISimpleMatch,
  ISimpleParticipant,
  ISummonerProfile,
} from "../types/types";
import Loading from "./Loading";
import MatchComponent from "./MatchComponent";
import UserRecentInfoComponent from "./UserRecentInfoComponent";

interface IProp {
  data: ISummonerProfile;
  q?: IPostQueueId;
}

const MatchesComponent = React.memo(({ data, q }: IProp) => {
  const pageNumber = useRef(1);
  const [gameListData, setGameListData] = useState<ISimpleMatch[]>(
    filtering(data.matches)
  );
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [userGameList, setUserGameList] = useState<ISimpleParticipant[]>([]);

  function filtering(data: ISimpleMatch[]) {
    switch (q) {
      case "ALL":
        return data;
      case undefined:
        return data.filter((t) => {
          return (
            t.queueId !== "SOLO_RANK_GAME" &&
            t.queueId !== "FLEX_RANK_GAME" &&
            t.queueId !== "QUICK_PLAY"
          );
        });
      default:
        return data.filter((t) => t.queueId === q);
    }
  }

  useEffect(() => {
    const target = filtering(gameListData);
    const temp: ISimpleParticipant[] = [];
    target.forEach((v) => {
      const ttarget = v.participants.find(
        (t) =>
          t.summonerName.toLowerCase() ===
          data.profile.summonerName.toLowerCase()
      );
      if (ttarget) {
        temp.push(ttarget);
      }
    });

    setUserGameList(temp);
  }, [gameListData, q, data]);

  const getMoreGameList = async (puid: string) => {
    const targetNumber = pageNumber.current + 1;
    const gameData = await GetGameList(puid, targetNumber, q || "ALL");
    if (gameData) {
      setGameListData(filtering([...gameListData, ...gameData.data]));
      pageNumber.current = pageNumber.current + 1;
      setIsMoreLoading(false);
    }
  };

  return (
    <div className="summoner_detail_wrapper">
      <UserRecentInfoComponent userData={userGameList} />
      <div className="matches_container">
        {gameListData.length !== 0 ? (
          <>
            {filtering(gameListData).map((v) => {
              return (
                <MatchComponent
                  key={v.matchId}
                  matchData={v}
                  userName={data.profile.summonerName}
                />
              );
            })}
            <div className="more_match">
              {isMoreLoading ? (
                <Loading width={32} />
              ) : (
                <button
                  onClick={() => {
                    setIsMoreLoading(true);
                    getMoreGameList(data.profile.puuid);
                  }}
                  type="button"
                >
                  더보기
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="summoner_detail_wrapper">
            매칭기록이 존재하지 않습니다.
          </div>
        )}
      </div>
    </div>
  );
});

export default MatchesComponent;
