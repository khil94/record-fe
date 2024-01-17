import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TIER_TYPE_LIST } from "../constants/Enum";
import { IDuoObj, ILineType, ITierType } from "../types/types";
import "./DuoDetailModal.scss";
import StyledInput from "./StyledInput";

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
  const { gameName, tagLine, lines, wishLines, wishTiers } = obj;
  console.log(obj, wishLines);
  const [ticketMode, setTicketMode] = useState(false);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [userLines, setUserLines] = useState<ILineType[]>([]);
  const [userWishLines, setUserWishLines] = useState<ILineType[]>([]);
  const [userWishTiers, setUserWishTiers] = useState<ITierType[]>([]);

  const [memo, setMemo] = useState("");
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

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

  function getPositionClassName(list: ILineType[], target: ILineType) {
    return list.includes(target) ? "selected" : "";
  }

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
            <StyledInput
              disabled={!ticketMode}
              label="소환사이름"
              onChange={(e) => {
                ticketMode && setName(e.target.value);
              }}
              value={!ticketMode ? gameName : name}
            />
            <StyledInput
              disabled={!ticketMode}
              onChange={(e) => {
                ticketMode && setTag(e.target.value);
              }}
              label="태그"
              value={!ticketMode ? tagLine : tag}
            />
          </div>
          <div className="select_my_line">
            나의 포지션
            <div
              onClick={(e) => {
                e.preventDefault();
                ticketMode && Setter(userLines, setUserLines, e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  "TOP"
                )}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  "JG"
                )}
                value={"JG"}
              >
                <img src="/Position_jungle.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  "MID"
                )}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  "AD"
                )}
                value={"AD"}
              >
                <img src="/Position_bot.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  "SUP"
                )}
                value={"SUP"}
              >
                <img src="/Position_support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_lines">
            찾는 포지션
            <div
              onClick={(e) => {
                e.preventDefault();
                ticketMode &&
                  Setter(userWishLines, setUserWishLines, e.target.value);
              }}
              className="select_wrapper"
            >
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userWishLines : wishLines,
                  "TOP"
                )}
                value={"TOP"}
              >
                <img src="/Position_top.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userWishLines : wishLines,
                  "JG"
                )}
                value={"JG"}
              >
                <img src="/Position_jungle.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userWishLines : wishLines,
                  "MID"
                )}
                value={"MID"}
              >
                <img src="/Position_mid.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userWishLines : wishLines,
                  "AD"
                )}
                value={"AD"}
              >
                <img src="/Position_bot.png" />
              </button>
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userWishLines : wishLines,
                  "SUP"
                )}
                value={"SUP"}
              >
                <img src="/Position_support.png" />
              </button>
            </div>
          </div>
          <div className="select_wish_rank">
            찾는 랭크
            <div
              onClick={(e) => {
                e.preventDefault();
                ticketMode &&
                  Setter(userWishTiers, setUserWishTiers, e.target.value);
              }}
              className="select_wrapper"
            >
              {TIER_TYPE_LIST.map((v) => {
                return (
                  <button
                    type="button"
                    key={`button_${v}`}
                    className={`${
                      (ticketMode ? userWishTiers : wishTiers).includes(v)
                        ? "selected"
                        : ""
                    }`}
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
            {ticketMode && (
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              ></textarea>
            )}
          </div>
          <button onClick={() => setTicketMode(!ticketMode)} type="button">
            신청
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
