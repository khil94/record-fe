import { useState } from "react";
import { Link } from "react-router-dom";
import { ISimpleMatch, ISimpleParticipant } from "../types/types";
import { getGameType } from "../utils/generalFunctions";
import "./MatchComponent.scss";
import ObjImgComponent from "./ObjImgComponent";

interface IProps {
  matchData: ISimpleMatch;
  userName: string;
}
export default function MatchComponent({ matchData, userName }: IProps) {
  const [show, setShow] = useState(false);
  const { matchId, queueId, participants } = matchData;
  const sortedParticipants = participants.sort((a, b) => {
    if (b.win && !a.win) {
      return 1;
    }
    if (!b.win && a.win) {
      return -1;
    }
    return 0;
  });

  const target = participants.find((v) => v.summonerName === userName)!;
  // 승/패 팀 나누어서 표기 할것 => 두 팀을 나누어서 변수화 해라

  const ParticipantComponent = (target: ISimpleParticipant) => {
    return (
      <div
        className={`match_component ${target.win ? "match_win" : "match_lose"}`}
      >
        <div className="champ_icon">
          <img src={target.champion.image} alt="챔피언 아이콘" />
          <span className="champ_level">{target.championLevel}</span>
        </div>
        <div className="spell_wrapper wrapper">
          {target.spells.map((v, i) => (
            <ObjImgComponent key={`spell-${target.summonerName}-${i}`} {...v} />
          ))}
        </div>
        <div className="rune_wrapper wrapper">
          <ObjImgComponent {...target.mainRune} />
          <ObjImgComponent {...target.subRune} />
        </div>
        <div className="summoner_info_wrapper wrapper">
          <Link to={`/summoner/${target.summonerName}`}>
            {target.summonerName}
          </Link>
          <span className="summoner_level">{`Level ${target.summonerLevel}`}</span>
        </div>
        <div className="kda_wrapper">
          <span>{target.kills} /</span>
          <span className="kda_death">{target.deaths}</span>
          <span> / {target.assists}</span>
        </div>
        <div className="item_wrapper">
          {target.items.map((v, i) => {
            {
              return (
                <div
                  key={matchId + userName + v.name + i}
                  className="item_icon"
                >
                  {v && <ObjImgComponent {...v} description={v.plaintext} />}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="match_wrapper">
      {target && (
        <div
          className={`match_summary_wrapper   ${
            target.win ? "match_win" : "match_lose"
          }`}
        >
          <div className="match_result">
            <span className={`${target.win ? "win" : "lose"}`}>
              {target.win ? "승리" : "패배"}
            </span>
            <span>{getGameType(queueId)}</span>
          </div>
          <div className="match_summary">
            <div className="champ_icon">
              <img src={target.champion.image} alt="챔피언 아이콘" />
              <span className="champ_level">{target.championLevel}</span>
            </div>
            <div className="spell_wrapper wrapper">
              {target.spells.map((v, i) => (
                <ObjImgComponent
                  key={`spell-${target.summonerName}-${i}`}
                  {...v}
                />
              ))}
            </div>
            <div className="rune_wrapper wrapper">
              <ObjImgComponent {...target.mainRune} />
              <ObjImgComponent {...target.subRune} />
            </div>
            <div className="kda_wrapper">
              <span>{target.kills} /</span>
              <span className="kda_death">{target.deaths}</span>
              <span> / {target.assists}</span>
            </div>
            <div className="item_wrapper">
              {target.items.map((v, i) => {
                {
                  return (
                    <div
                      key={matchId + userName + v.name + i}
                      className="item_icon"
                    >
                      {v && (
                        <ObjImgComponent {...v} description={v.plaintext} />
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div
            className={`open_close_btn_wrapper ${
              target.win ? "match_win" : "match_lose"
            }`}
          >
            <button
              className={`${show ? "close" : "open"}`}
              type="button"
              onClick={() => setShow(!show)}
            ></button>
          </div>
        </div>
      )}
      {show ? (
        <div className="match_detail_wrapper">
          <div className="match_detail">
            {sortedParticipants.slice(0, 5).map((v) => (
              <ParticipantComponent
                key={`${v.summonerName}+${matchId}`}
                {...v}
              />
            ))}
          </div>
          <div className="match_detail">
            {sortedParticipants.slice(5).map((v) => (
              <ParticipantComponent
                key={`${v.summonerName}+${matchId}`}
                {...v}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
