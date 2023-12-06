import { useEffect, useState } from "react";
import { ISimpleParticipant } from "../types/types";
import "./UserRecentInfoComponent.scss";
interface IProp {
  userData: ISimpleParticipant[];
}

interface IChampRate {
  [v: string]: string | number;
  name: string;
  image: string;
  win: number;
  lose: number;
  kill: number;
  deaths: number;
  assists: number;
  games: number;
}

interface IChampRateObj {
  [v: string]: IChampRate;
}

export default function UserRecentInfoComponent({ userData }: IProp) {
  const [data, setData] = useState<IChampRateObj>({});
  const [win, setWin] = useState(0);
  useEffect(() => {
    let win = 0;
    const champObj: IChampRateObj = {};
    userData.forEach((v) => {
      v.win && win++;

      if (champObj[v.champion.name]) {
        v.win
          ? champObj[v.champion.name].win++
          : champObj[v.champion.name].lose++;
        champObj[v.champion.name].kill += v.kills;
        champObj[v.champion.name].deaths += v.deaths;
        champObj[v.champion.name].assists += v.assists;
        champObj[v.champion.name].games++;
      } else {
        champObj[v.champion.name] = {
          name: v.champion.name,
          image: v.champion.image,
          win: v.win ? 1 : 0,
          lose: v.win ? 0 : 1,
          kill: v.kills,
          deaths: v.deaths,
          assists: v.assists,
          games: 1,
        };
      }
    });
    setData(champObj);
    setWin(win);
  }, [userData]);

  function UserRecentChampComponent(dt: IChampRateObj) {
    const crl: IChampRate[] = [];
    Object.keys(dt).forEach((v) => {
      crl.push(dt[v]);
    });
    crl.sort((a, b) => b.win - a.win);
    return (
      <div>
        {crl.map((t) => {
          return (
            <div className="recent_champ_wrapper" key={t.image}>
              <div className="champ_icon">
                <div>
                  <img src={t.image} />
                </div>
                <span>{t.name}</span>
              </div>
              <div className="recent_champ_kda">
                <span>{(t.kill / t.games).toFixed(1)} /</span>
                <span> {(t.deaths / t.games).toFixed(1)} /</span>
                <span> {(t.assists / t.games).toFixed(1)}</span>
              </div>
              <div className="recent_champ_win_rate">
                <span>{t.win}승</span>
                <span>{t.lose}패</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      {userData.length > 0 && (
        <div className="summoner_champ_info">
          <div className="summoner_recent_header">
            <span>최근 전적</span>
            <span>{`${userData.length}전 ${win}승 ${
              userData.length - win
            }패`}</span>
          </div>
          <UserRecentChampComponent {...data} />
        </div>
      )}
    </>
  );
}
