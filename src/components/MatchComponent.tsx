import { useState } from "react";
import { ISimpleMatch, ISimpleParticipant } from "../types/types";
import "./MatchComponent.scss";

interface IProps {
  matchData: ISimpleMatch;
  userName: string;
}
export default function MatchComponent({ matchData, userName }: IProps) {
  const [show, setShow] = useState(false);
  const { matchId, gameMode, gameType, queueId, participants } = matchData;

  const target = participants.find((v) => v.summonerName === userName)!;
  const itemList = [
    target.item0,
    target.item1,
    target.item2,
    target.item3,
    target.item4,
    target.item5,
    target.item6,
  ];

  // 승/패 팀 나누어서 표기 할것 => 두 팀을 나누어서 변수화 해라

  const ParticipantComponent = (target: ISimpleParticipant) => {
    const targetItemList = [
      target.item0,
      target.item1,
      target.item2,
      target.item3,
      target.item4,
      target.item5,
      target.item6,
    ];
    return (
      <div
        className={`participant_wrapper ${
          target.win ? "match_win" : "match_lose"
        }`}
      >
        <div className="champ_icon">
          <img src="" alt="챔피언 아이콘" />
        </div>
        <div className="spell_wrapper">
          <img src="" alt="스펠 아이콘" />
          <img src="" alt="스펠 아이콘" />
        </div>
        <div className="rune_wrapper">
          <img src="" alt="룬 아이콘" />
          <img src="" alt="룬 아이콘" />
        </div>
        <div className="kda_wrapper">
          <span>{target.kills} /</span>
          <span className="kda_death">{target.deaths}</span>
          <span> / {target.assists}</span>
        </div>
        <div className="cs_wrapper"></div>
        <div className="item_wrapper">
          {targetItemList.map((v) => {
            {
              return (
                <div key={matchId + userName + v} className="item_icon">
                  <img src="" alt="아이템이미지" />
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
      <div className="match_summary_wrapper">
        <div
          className={`match_summary ${target.win ? "match_win" : "match_lose"}`}
        >
          <div className="champ_wrapper">
            <div className="champ_icon">
              <img src="" alt="챔피언 아이콘" />
            </div>
            <div className="spell_wrapper">
              <img src="" alt="스펠 아이콘" />
              <img src="" alt="스펠 아이콘" />
            </div>
            <div className="rune_wrapper">
              <img src="" alt="룬 아이콘" />
              <img src="" alt="룬 아이콘" />
            </div>
          </div>
          <div className="kda_wrapper">
            <span>{target.kills} /</span>
            <span className="kda_death">{target.deaths}</span>
            <span> / {target.assists}</span>
          </div>
          <div className="cs_wrapper"></div>
          <div className="item_wrapper">
            {itemList.map((v) => {
              {
                return (
                  <div key={matchId + userName + v} className="item_icon">
                    <img src="" alt="아이템이미지" />
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
      {show ? (
        <div className="match_detail_wrapper">
          {participants.map((v) => (
            <ParticipantComponent {...v} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
