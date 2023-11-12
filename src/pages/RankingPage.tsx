import { useState } from "react";

interface ITestRank {
  [v: string]: string | number;
  summonerName: string;
  rank: number;
  tier: string;
  lp: number;
  level: number;
  win: number;
  lose: number;
}

export default function RankingPage() {
  const [rnkData, setRnkData] = useState<ITestRank[]>([]);

  return (
    <div className="ranking_page">
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
          {rnkData.map((v) => {
            return (
              <tr id={v.summonerName}>
                {Object.keys(v).map((t) => {
                  return <td>{v[t]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
