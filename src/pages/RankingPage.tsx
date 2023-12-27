import { useState } from "react";
import { Link } from "react-router-dom";
import { useRankingInfo } from "../api/apis";
import Loading from "../components/Loading";
import { ILeaderBoardQueueTyep } from "../types/types";
import "./RankingPage.scss";

export default function RankingPage() {
  const [currentQueueType, setCurrentQueueType] =
    useState<ILeaderBoardQueueTyep>("RANKED_SOLO_5x5");
  const [currentPage, setCurrentPage] = useState(0);
  const MAX_PAGE_NUMBER = 100;
  const { data, isLoading } = useRankingInfo(currentQueueType, 1);

  function WinRateComponent({ wins, loses }: { wins: number; loses: number }) {
    const total = wins + loses;
    return (
      <td className="win_rate">
        <div className="win_rate_wrapper">
          <span style={{ width: `${(wins * 100) / total}%` }} className="win">
            {`${wins}W`}
          </span>
          <span style={{ width: `${(loses * 100) / total}%` }} className="lose">
            {`${loses}L`}
          </span>
        </div>
      </td>
    );
  }

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
                  <col width={60} />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">순위</th>
                    <th scope="col">소환사</th>
                    <th scope="col">LP</th>
                    <th scope="col">승률</th>
                  </tr>
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
                          <td>
                            <span>{currentPage * 100 + i + 1}</span>
                          </td>
                          <td>
                            <Link to={`/summoner/${v.summonerName}`}>
                              <span className="rank_summoner_name">
                                {v.summonerName}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <span>{v.leaguePoints}</span>
                          </td>
                          <WinRateComponent wins={v.wins} loses={v.loses} />
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="page_wrapper">
              {Array(Math.ceil((data?.players.length || 0) / 100))
                .fill("")
                .map((_, i) => {
                  return (
                    <button
                      key={`rank-button-${i}`}
                      className={`${currentPage === i ? "selected" : ""}`}
                      onClick={() => {
                        setCurrentPage(i);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
