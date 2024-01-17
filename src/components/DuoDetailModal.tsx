import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostTicket } from "../api/apis";
import { TIER_TYPE_LIST } from "../constants/Enum";
import { IDuoObj, ILineType, ITicketPost } from "../types/types";
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
  const { gameName, tagLine, lines, wishLines, wishTiers, id, tickets } = obj;

  const [ticketMode, setTicketMode] = useState(false);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [userLines, setUserLines] = useState<ILineType[]>([]);

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

  function getPositionClassName<T>(list: T[], target: T) {
    return list.includes(target) ? "selected" : "";
  }

  async function postTicket() {
    try {
      const data = {
        gameName: name,
        tagLine: tag,
        lines: userLines,
        memo,
      } as ITicketPost;
      const resp = await PostTicket(id, data);
    } catch {
      console.log("test");
    }
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
        <div className="duo_detailmodal_header">
          <span
            onClick={() => {
              onDisapppear();
            }}
            className="duo_detailmodal_x"
          >
            x
          </span>
        </div>
        <div className="duo_detailmodal_inner">
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
                  <img src="/Position_jg.png" />
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
                  <img src="/Position_ad.png" />
                </button>
                <button
                  type="button"
                  className={getPositionClassName(
                    ticketMode ? userLines : lines,
                    "SUP"
                  )}
                  value={"SUP"}
                >
                  <img src="/Position_sup.png" />
                </button>
              </div>
            </div>
            {!ticketMode ? (
              <>
                <div className="select_wish_lines">
                  찾는 포지션
                  <div className="select_wrapper">
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
                {
                  <div className="select_wish_rank">
                    찾는 랭크
                    <div className="select_wrapper">
                      {TIER_TYPE_LIST.map((v) => {
                        return (
                          <button
                            type="button"
                            key={`button_${v}`}
                            className={getPositionClassName(wishTiers, v)}
                            value={v}
                          >
                            <img src={`/${v.toLowerCase()}.webp`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                }
              </>
            ) : (
              <></>
            )}
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
            <button
              onClick={() => {
                ticketMode ? postTicket() : setTicketMode(!ticketMode);
              }}
              type="button"
            >
              신청
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
