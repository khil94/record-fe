import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostDuo } from "../api/apis";
import { TIER_TYPE_LIST } from "../constants/Enum";
import { IDuoPost, IDuoQueueId, ILineType, ITierType } from "../types/types";
import CommonModal from "./CommonModal";
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
  onDisapppear: () => void;
}
export default function DuoModal({
  showModal,
  onDisapppear = () => {},
}: IProp) {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [lines, setLines] = useState<ILineType[]>([]);
  const [wishLines, setWishLines] = useState<ILineType[]>([]);
  const [wishTiers, setWishTiers] = useState<ITierType[]>([]);
  const [show, setShow] = useState(showModal);
  const [memo, setMemo] = useState("");
  const [queueType, setQueueType] = useState<IDuoQueueId>("SOLO_RANK_GAME");

  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function postDuo() {
    const postData: IDuoPost = {
      gameName,
      tagLine,
      lines,
      wishLines,
      wishTiers,
      memo,
      duoQueueId: queueType,
    };
    try {
      await PostDuo(postData);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrMsg(e.response?.data.message);
        setShowErrModal(true);
      }
    }
  }

  function Setter<T>(
    target: T[],
    setter: Dispatch<SetStateAction<T[]>>,
    val: T
  ) {
    if (target.includes(val)) {
      setter(target.filter((v) => v !== val));
    } else {
      setter([...target, val]);
    }
  }

  function getPositionClassName<T>(list: T[], target: T) {
    return list.includes(target) ? "selected" : "";
  }

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  // console.log(line, wishLines, wishTiers, gameName, tagLine, memo);

  return show ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onDisapppear();
      }}
      className="duomodal_outer_wrapper"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="duomodal_inner_wrapper"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postDuo();
          }}
        >
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
                Setter(lines, setLines, e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={getPositionClassName(lines, "TOP")}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(lines, "JG")}
                value={"JG"}
              >
                <img src="/Position_jg.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(lines, "MID")}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(lines, "AD")}
                value={"AD"}
              >
                <img src="/Position_ad.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(lines, "SUP")}
                value={"SUP"}
              >
                <img src="/Position_sup.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_lines">
            찾는 포지션
            <div
              onClick={(e) => {
                e.preventDefault();
                Setter(wishLines, setWishLines, e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={getPositionClassName(wishLines, "TOP")}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(wishLines, "JG")}
                value={"JG"}
              >
                <img src="/Position_jg.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(wishLines, "MID")}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(wishLines, "AD")}
                value={"AD"}
              >
                <img src="/Position_ad.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(wishLines, "SUP")}
                value={"SUP"}
              >
                <img src="/Position_sup.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_rank">
            찾는 랭크
            <div
              onClick={(e) => {
                e.preventDefault();
                Setter(wishTiers, setWishTiers, e.target.value);
              }}
              className="select_wrapper"
            >
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
          <div className="duo_queuetype_dropbox">
            <select
              onChange={(e) => setQueueType(e.target.value as IDuoQueueId)}
            >
              <option value={"SOLO_RANK_GAME"}>솔로 랭크</option>
              <option value={"FLEX_RANK_GAME"}>자유 랭크</option>
              <option value={"QUICK_PLAY"}>일반 게임</option>
            </select>
          </div>
          <div className="duo_memo">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">제출</button>
        </form>
      </div>
      <CommonModal
        showModal={showErrModal}
        title="에러 발생"
        message={errMsg}
        onDisapppear={() => setShowErrModal(false)}
      />
    </div>
  ) : (
    <></>
  );
}
