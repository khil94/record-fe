import { useEffect, useState } from "react";
import { TIER_TYPE_LIST } from "../constants/Enum";
import { IDuoObj } from "../types/types";
import "./DuoDetailModal.scss";
import StyledInput from "./StyledInput";

// export interface IDuoPost {
//   gameName: string;
//   tagLine: string;
//   line: string;
//   wishLines: string[];
//   wishTiers: ITierType[];
//   memo: string;
// }
interface IProp {
  showModal: boolean;
  onDisapppear: () => void;
  obj: IDuoObj;
}
export default function DuoDetailModal({
  showModal,
  onDisapppear = () => {},
  obj,
}: IProp) {
  const { gameName, tagLine, line, wishLines, wishTiers } = obj;
  console.log(obj, wishLines);
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  // console.log(line, wishLines, wishTiers, gameName, tagLine, memo);

  return show ? (
    <div
      onClick={(e) => {
        onDisapppear();
      }}
      className="duo_detailmodal_outer_wrapper"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="duo_detailmodal_inner_wrapper"
      >
        <form>
          <div className="duomodal_name_wrapper">
            <StyledInput disabled label="소환사이름" value={gameName} />
            <StyledInput disabled label="태그" value={tagLine} />
          </div>
          <div className="select_my_line">
            나의 포지션
            <div className="select_wrapper">
              <button
                type="button"
                className={`${line === "TOP" ? "selected" : ""}`}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={`${line === "JUNGLE" ? "selected" : ""}`}
                value={"JUNGLE"}
              >
                <img src="/Position_jungle.png" />
              </button>
              <button
                type="button"
                className={`${line === "MID" ? "selected" : ""}`}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={`${line === "BOT" ? "selected" : ""}`}
                value={"BOT"}
              >
                <img src="/Position_bot.png" />
              </button>
              <button
                type="button"
                className={`${line === "SUPPORT" ? "selected" : ""}`}
                value={"SUPPORT"}
              >
                <img src="/Position_support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_lines">
            찾는 포지션
            <div className="select_wrapper">
              <button
                type="button"
                className={`${wishLines.includes("TOP") ? "selected" : ""}`}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("JUNGLE") ? "selected" : ""}`}
                value={"JUNGLE"}
              >
                <img src="/Position_jungle.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("MID") ? "selected" : ""}`}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("BOT") ? "selected" : ""}`}
                value={"BOT"}
              >
                <img src="/Position_bot.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("SUPPORT") ? "selected" : ""}`}
                value={"SUPPORT"}
              >
                <img src="/Position_support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_rank">
            찾는 랭크
            <div className="select_wrapper">
              {TIER_TYPE_LIST.map((v) => {
                return (
                  <button
                    type="button"
                    key={`button_${v}`}
                    className={`${wishTiers.includes(v) ? "selected" : ""}`}
                    value={v}
                  >
                    <img src={`/${v.toLowerCase()}.webp`} />
                  </button>
                );
              })}
            </div>
          </div>
          {/* <div className="duo_queuetype_dropbox">
            <div className=" select_queue_type">
              <button type="button">{"솔로랭크"}</button>
              <span>솔로 랭크</span>
              <span>자유 랭크</span>
              <span>일반</span>
            </div>
          </div> */}
          <div className="duo_memo">
            {/* <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></textarea> */}
          </div>
          <button onClick={() => onDisapppear()} type="button">
            확인
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
