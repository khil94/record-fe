import { useState } from "react";
import { TIER_TYPE_LIST } from "../constants/Enum";
import { ITierType } from "../types/types";
import "./DuoModal.scss";
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

  onDisapppear?: () => void;
}
export default function DuoModal({
  showModal,
  onDisapppear = () => {},
}: IProp) {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [line, setLine] = useState("");
  const [wishLines, setWishLines] = useState<string[]>([]);
  const [wishTiers, setWishTiers] = useState<ITierType[]>([]);
  const [show, setShow] = useState(showModal);
  console.log(show);
  function setMyLine(val: string) {
    if (line === val) {
      setLine("");
    } else {
      setLine(val);
    }
  }

  function setLines(val: string) {
    const lines = wishLines;
    if (lines.includes(val)) {
      setWishLines(wishLines.filter((v) => v !== val));
    } else {
      setWishLines([...wishLines, val]);
    }
  }

  function setTiers(val: ITierType) {
    const tiers = wishTiers;
    if (tiers.includes(val)) {
      setWishTiers(wishTiers.filter((v) => v !== val));
    } else {
      setWishTiers([...wishTiers, val]);
    }
  }

  console.log(line, wishLines);

  return show ? (
    <div
      onClick={(e) => {
        setShow(false);
        onDisapppear();
      }}
      className="duomodal_outer_wrapper"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="duomodal_inner_wrapper"
      >
        <form>
          <div className="duomodal_name_wrapper">
            <StyledInput
              onChange={(e) => setGameName(e.target.value)}
              label="소환사이름"
              value={gameName}
            />
            <StyledInput
              onChange={(e) => setTagLine(e.target.value)}
              label="태그"
              value={tagLine}
            />
          </div>
          <div className="select_my_line">
            나의 포지션
            <div
              onClick={(e) => {
                e.preventDefault();
                setMyLine(e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={`${line === "TOP" ? "selected" : ""}`}
                value={"TOP"}
              >
                <img src="/Position_Top.png" />
              </button>
              <button
                type="button"
                className={`${line === "JUNGLE" ? "selected" : ""}`}
                value={"JUNGLE"}
              >
                <img src="/Position_Jungle.png" />
              </button>
              <button
                type="button"
                className={`${line === "MID" ? "selected" : ""}`}
                value={"MID"}
              >
                <img src="/Position_Mid.png" />
              </button>
              <button
                type="button"
                className={`${line === "BOT" ? "selected" : ""}`}
                value={"BOT"}
              >
                <img src="/Position_Bot.png" />
              </button>
              <button
                type="button"
                className={`${line === "SUPPORT" ? "selected" : ""}`}
                value={"SUPPORT"}
              >
                <img src="/Position_Support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_lines">
            찾는 포지션
            <div
              onClick={(e) => {
                e.preventDefault();
                setLines(e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={`${wishLines.includes("TOP") ? "selected" : ""}`}
                value={"TOP"}
              >
                <img src="/Position_Top.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("JUNGLE") ? "selected" : ""}`}
                value={"JUNGLE"}
              >
                <img src="/Position_Jungle.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("MID") ? "selected" : ""}`}
                value={"MID"}
              >
                <img src="/Position_Mid.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("BOT") ? "selected" : ""}`}
                value={"BOT"}
              >
                <img src="/Position_Bot.png" />
              </button>
              <button
                type="button"
                className={`${wishLines.includes("SUPPORT") ? "selected" : ""}`}
                value={"SUPPORT"}
              >
                <img src="/Position_Support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_rank">
            찾는 랭크
            <div
              onClick={(e) => {
                e.preventDefault();
                setTiers(e.target.value);
              }}
              className="select_wrapper"
            >
              {TIER_TYPE_LIST.map((v) => {
                return (
                  <button
                    type="button"
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
            <textarea></textarea>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
