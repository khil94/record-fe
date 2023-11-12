import { useEffect, useState } from "react";
import { GetRankingList } from "../api/apis";
import { ILeaderBoardQueueTyep, IRanking } from "../types/types";
import "./RankingPage.scss";

export default function RankingPage() {
  const [rnkData, setRnkData] = useState<IRanking>();
  const [currentQueueType, setCurrentQueueType] =
    useState<ILeaderBoardQueueTyep>("RANKED_SOLO_5x5");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const resp = await GetRankingList(currentQueueType, currentPage);
      if (resp) {
        setRnkData(resp.data);
      }
    };
    getData();
  }, [currentQueueType]);

  return (
    <div className="ranking_page">
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
            <col width={40} />
            <col />
            <col width={110} />
            <col width={60} />
            <col width={50} />
            <col width={172} />
          </colgroup>
          <thead>
            <th align="left" scope="col">
              순위
            </th>
            <th align="left" scope="col">
              소환사
            </th>
            <th align="left" scope="col">
              티어
            </th>
            <th align="left" scope="col">
              LP
            </th>
            <th align="left" scope="col">
              레벨
            </th>
            <th align="left" scope="col">
              승률
            </th>
          </thead>
          <tbody>
            {rnkData?.players.map((v, i) => {
              return (
                <tr key={v.summonerName}>
                  {Object.keys(v).map((t) => {
                    if (t !== "summonerId") {
                      return (
                        <td align="left" key={v + t}>
                          {v[t]}
                        </td>
                      );
                    } else {
                      return (
                        <td align="left" key={v + t}>
                          {i + 1}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
