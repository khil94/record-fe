import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRankingInfo } from "../api/apis";
import { ILeaderBoardQueueTyep } from "../types/types";
import "./RankingPage.scss";

export default function RankingPage() {
  const [currentQueueType, setCurrentQueueType] =
    useState<ILeaderBoardQueueTyep>("RANKED_SOLO_5x5");
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigate();
  const MAX_PAGE_NUMBER = 100;
  const { data } = useRankingInfo(currentQueueType, 1);
  console.log(data);

  return (
    <div className="ranking_page">
      <div className="ranking_page_wrapper">
        <div className="select_queue_type">
          <div
            className={
              currentQueueType === "RANKED_SOLO_5x5" ? "selected_tab" : "tab"
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
                      {Object.keys(v).map((t) => {
                        console.log(t, v[t]);
                        switch (t) {
                          case "summonerId":
                            return <td key={v + t}>{i + 1}</td>;
                          case "summonerName":
                            return (
                              <td key={v + t}>
                                <span
                                  className="rank_summoner_name"
                                  onClick={() => {
                                    console.log(v[t]);
                                    navigation(`/summoner/${v[t]}`);
                                  }}
                                >
                                  {v[t]}
                                </span>
                              </td>
                            );
                          case "rank":
                            return;
                          default:
                            return <td key={v + t}>{v[t]}</td>;
                        }
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
