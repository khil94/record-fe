import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRankingInfo } from "../api/apis";
import Loading from "../components/Loading";
import { ILeaderBoardQueueTyep } from "../types/types";
import "./RankingPage.scss";

export default function RankingPage() {
  const [currentQueueType, setCurrentQueueType] =
    useState<ILeaderBoardQueueTyep>("RANKED_SOLO_5x5");
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigate();
  const MAX_PAGE_NUMBER = 100;
  const { data, isLoading } = useRankingInfo(currentQueueType, 1);
  console.log(data?.players.length);
  return (
    <div className="ranking_page">
      <div className="ranking_page_wrapper">
        {isLoading ? (
          <Loading width={32} />
        ) : (
          <>
            <div className="select_queue_type">
              <div
                className={
                  currentQueueType === "RANKED_SOLO_5x5"
                    ? "selected_tab"
                    : "tab"
                }
                onClick={() => {
                  setCurrentQueueType("RANKED_SOLO_5x5");
                }}
              >
                솔로 랭크
              </div>
              <div
                className={
                  currentQueueType === "RANKED_FLEX_SR" ? "selected_tab" : "tab"
                }
                onClick={() => {
                  setCurrentQueueType("RANKED_FLEX_SR");
                }}
              >
                자유 랭크
              </div>
            </div>
            <div className="ranking_content">
              <table>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <th scope="col">순위</th>
                  <th scope="col">소환사</th>
                  <th scope="col">LP</th>
                  <th scope="col">승</th>
                  <th scope="col">패</th>
                </thead>
                <tbody>
                  {data?.players
                    .slice(
                      MAX_PAGE_NUMBER * currentPage,
                      MAX_PAGE_NUMBER * (currentPage + 1)
                    )
                    .map((v, i) => {
                      return (
                        <tr key={v.summonerName}>
                          <td>{currentPage * 100 + i + 1}</td>
                          <td>
                            <span
                              className="rank_summoner_name"
                              onClick={() => {
                                navigation(`/summoner/${v.summonerName}`);
                              }}
                            >
                              {v.summonerName}
                            </span>
                          </td>
                          <td>{v.leaguePoints}</td>
                          <td className="win">{v.wins}</td>
                          <td className="lose">{v.loses}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="rank_page_wrapper">
              {Array((data?.players.length || 0) / 100)
                .fill("")
                .map((v, i) => {
                  return (
                    <button onClick={() => setCurrentPage(i)}>{i + 1}</button>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
