import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostAcceptTicket, PostTicket } from "../api/apis";
import {
  IDuoObj,
  IDuoRecentMatch,
  IDuoTicket,
  ILineType,
  ITicketPost,
} from "../types/types";
import { getDateDiff, getMMDDHHmm } from "../utils/generalFunctions";
import CommonModal from "./CommonModal";
import "./DuoDetailModal.scss";
import ObjImgComponent from "./ObjImgComponent";
import StyledInput from "./StyledInput";

interface IProp {
  showModal: boolean;
  onDisapppear: () => void;
  obj: IDuoObj;
  own?: boolean;
}
export default function DuoDetailModal({
  showModal,
  onDisapppear = () => {},
  obj,
  own = false,
}: IProp) {
  const {
    gameName,
    tagLine,
    lines,
    wishLines,
    wishTiers,
    id,
    tickets,
    duoQueueId,
    recentMatches,
    matched,
    expiredAt,
  } = obj;

  const [ticketMode, setTicketMode] = useState(false);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [userLines, setUserLines] = useState<ILineType[]>([]);

  const [memo, setMemo] = useState("");
  const [show, setShow] = useState(showModal);

  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [isExpired, setIsExpired] = useState(
    matched || getDateDiff(new Date(expiredAt)) !== 0
  );

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
  console.log(recentMatches);

  async function postTicket() {
    try {
      const data = {
        gameName: name,
        tagLine: tag,
        lines: userLines,
        memo,
      } as ITicketPost;
      const resp = await PostTicket(id, data);
      onDisapppear();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrMsg(e.response?.data.message);
        setShowErrModal(true);
      }
    }
  }

  function TicketComponent(ticket: IDuoTicket) {
    return (
      <div className="ticket_wrapper">
        <Link to={`/summoner/${ticket.gameName}/${ticket.tagLine}`}>
          <span>{ticket.gameName}</span>
          <span className="tag_line">#{ticket.tagLine}</span>
        </Link>
        <span>{ticket.tier}</span>
        <span>
          {ticket.lines.map((v, i) => {
            return (
              <img
                key={`detail_lines_${ticket.id}_${i}_${v}`}
                src={`/Position_${v.toLowerCase()}.png`}
                width={24}
              />
            );
          })}
        </span>
        <span>
          {ticket.recentMatches.length > 0 ? (
            <RecentChampComp
              size={24}
              key={"ticket_" + ticket.gameName + ticket.tagLine}
              data={ticket.recentMatches}
            />
          ) : (
            <>최근 전적 없음</>
          )}
        </span>
        <span>{getMMDDHHmm(new Date(ticket.createdAt))}</span>
        <span>{ticket.memo}</span>
        {own && (
          <button
            className="duo_submit_btn"
            onClick={async () => {
              await PostAcceptTicket(ticket.duoId, ticket.id);
            }}
            type="button"
          >
            신청수락
          </button>
        )}
      </div>
    );
  }

  function RecentChampComp({
    data,
    key,
    size,
  }: {
    data: IDuoRecentMatch[];
    key: string;
    size: number;
  }) {
    console.log(data);
    return (
      <div className="duo_detail_recent_match">
        {data.map((v) => {
          return (
            <div key={key + v.championDto.image}>
              <ObjImgComponent
                description={`최근 KDA : ${v.kills}/${v.deaths}/${v.assists}`}
                src={v.championDto.image}
                name={v.championDto.name}
                width={size}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return show ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onDisapppear();
      }}
      className="duo_detailmodal_outer_wrapper"
    >
      <div className="duo_detailmodal_middle_wrapper">
        <div
          onClick={(e) => e.stopPropagation()}
          className="duo_detailmodal_inner_wrapper"
        >
          {isExpired && <img className="expired" src="/expired.png" />}
          <div className="duo_detailmodal_header">
            <span onClick={() => setTicketMode(false)}>
              {ticketMode ? "<" : ""}
            </span>
            <span
              onClick={() => {
                onDisapppear();
              }}
            >
              x
            </span>
          </div>
          <div className="duo_detailmodal_inner">
            <form>
              <div className="duomodal_name_wrapper duo_detail_wrapper">
                {!ticketMode ? (
                  <div className="duo_detail_name_wrapper">
                    <span>{gameName}</span>
                    <span>#{tagLine}</span>
                  </div>
                ) : (
                  <>
                    <StyledInput
                      label="소환사이름"
                      onChange={(e) => {
                        ticketMode && setName(e.target.value);
                      }}
                      mode="dark"
                      value={name}
                    />
                    <StyledInput
                      onChange={(e) => {
                        ticketMode && setTag(e.target.value);
                      }}
                      mode="dark"
                      label="태그"
                      value={tag}
                    />
                  </>
                )}
              </div>
              <div className="select_my_line duo_detail_wrapper">
                <div className="duo_detail_title">주 포지션</div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    ticketMode &&
                      Setter(userLines, setUserLines, e.target.value);
                  }}
                  className={`select_wrapper ${
                    ticketMode && "ticket_mode_select"
                  }`}
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
              {!ticketMode && (
                <>
                  <div className="select_wish_lines duo_detail_wrapper">
                    <div className="duo_detail_title">찾는 포지션</div>
                    <div
                      className={`select_wrapper ${
                        ticketMode && "ticket_mode_select"
                      }`}
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

                  <div className="select_wish_rank duo_detail_wrapper">
                    <div className="duo_detail_title">찾는 랭크</div>
                    <div
                      className={`select_wrapper ${
                        ticketMode && "ticket_mode_select"
                      }`}
                    >
                      {wishTiers.map((v) => {
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

                  <div>{duoQueueId}</div>

                  <div className="duo_detail_wrapper duo_detail_recent_wrapper">
                    {recentMatches.length > 0 ? (
                      <>
                        <div className="duo_detail_title">주 포지션</div>
                        <RecentChampComp
                          size={48}
                          key={gameName + tagLine}
                          data={recentMatches}
                        />
                      </>
                    ) : (
                      <span>최근 전적이 없습니다.</span>
                    )}
                  </div>
                </>
              )}
              <div className="duo_memo duo_detail_wrapper">
                {ticketMode && (
                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  ></textarea>
                )}
              </div>
              <div className="duo_submit_btn_wrapper duo_detail_wrapper">
                {!isExpired && (
                  <button
                    className="duo_submit_btn"
                    onClick={() => {
                      ticketMode ? postTicket() : setTicketMode(!ticketMode);
                    }}
                    type="button"
                  >
                    신청
                  </button>
                )}
              </div>
            </form>
          </div>
          {tickets.length > 0 && (
            <>
              신청 목록
              <div className="tickets_wrapper duo_detail_wrapper">
                {tickets.map((v) => {
                  return (
                    <>
                      <TicketComponent key={v.id} {...v} />
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <CommonModal
          showModal={showErrModal}
          title="에러 발생"
          message={errMsg}
          onDisapppear={() => setShowErrModal(false)}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
