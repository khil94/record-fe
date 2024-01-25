import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { PostAcceptTicket, PostTicket } from "../api/apis";
import { LINE_LIST } from "../constants/Enum";
import {
  IDuoObj,
  IDuoRecentMatch,
  IDuoTicket,
  ILineType,
  ITicketPost,
} from "../types/types";
import {
  ellipsisString,
  getDateDiff,
  getGameType,
  getMMDDHHmm,
} from "../utils/generalFunctions";
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
    memo,
  } = obj;

  const [ticketMode, setTicketMode] = useState(false);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [userLines, setUserLines] = useState<ILineType[]>([]);

  const [userMemo, setUserMemo] = useState("");
  const [show, setShow] = useState(showModal);

  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [showAcceptModal, setShowAcceptModal] = useState(false);

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

  async function postTicket() {
    try {
      const data = {
        gameName: name,
        tagLine: tag,
        lines: userLines,
        memo: userMemo,
      } as ITicketPost;
      const resp = await PostTicket(id, data);
      onDisapppear();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        setErrMsg(e.response?.data.message);
        setShowErrModal(true);
      }
    }
  }

  async function postAcceptTicket(duoId: number, id: number) {
    try {
      await PostAcceptTicket(duoId, id);
      setShowAcceptModal(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrMsg(e.response?.data.message);
        setShowErrModal(true);
      }
    }
  }

  function TicketComponent(ticket: IDuoTicket) {
    const [showMemo, setShowMemo] = useState(false);
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
            <RecentChampComp size={24} data={ticket.recentMatches} />
          ) : (
            <>최근 전적 없음</>
          )}
        </span>
        <span>{getMMDDHHmm(new Date(ticket.createdAt))}</span>
        <div
          className="ticket_memo_wrapper"
          onMouseEnter={() => setShowMemo(true)}
          onMouseLeave={() => setShowMemo(false)}
        >
          {ellipsisString(ticket.memo, 8)}
          {showMemo && ticket.memo && (
            <div className="memo_description">
              <span>{ticket.memo}</span>
            </div>
          )}
        </div>
        {own && (
          <button
            className="ticket_accept_btn"
            onClick={() => {
              postAcceptTicket(ticket.duoId, ticket.id);
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
    size,
  }: {
    data: IDuoRecentMatch[];
    size: number;
  }) {
    return (
      <div className="duo_detail_recent_match">
        {data.map((v, i) => {
          return (
            <div key={i + v.championDto.image}>
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

  const MainPosition = useCallback(() => {
    return (
      <div className="select_my_line duo_detail_wrapper">
        <div className="duo_detail_title">주 포지션</div>
        <div
          onClick={(e) => {
            e.preventDefault();
            ticketMode && Setter(userLines, setUserLines, e.target.value);
          }}
          className={`select_wrapper ${ticketMode && "ticket_mode_select"}`}
        >
          {LINE_LIST.map((v) => {
            return (
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  v
                )}
                value={v}
              >
                <img src={`/Position_${v.toLowerCase()}.png`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }, [ticketMode, userLines, lines]);

  function SeekPosition() {
    return (
      <div className="select_wish_lines duo_detail_wrapper">
        <div className="duo_detail_title">찾는 포지션</div>
        <div className={`select_wrapper ${ticketMode && "ticket_mode_select"}`}>
          {LINE_LIST.map((v) => {
            return (
              <button
                type="button"
                className={getPositionClassName(
                  ticketMode ? userLines : lines,
                  v
                )}
                value={v}
              >
                <img src={`/Position_${v.toLowerCase()}.png`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const SeekTier = useCallback(() => {
    return (
      <div className="select_wish_rank duo_detail_wrapper">
        <div className="duo_detail_title">찾는 랭크</div>
        <div className={`select_wrapper ${ticketMode && "ticket_mode_select"}`}>
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
    );
  }, [ticketMode, wishTiers]);

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
            <div className="duo_detail_main_title">
              {ticketMode ? "듀오 신청" : ""}
            </div>
            <form>
              <div className="duomodal_name_wrapper duo_detail_wrapper">
                {!ticketMode ? (
                  <div className="duo_detail_name_wrapper">
                    <span>{gameName}</span>
                    <span>#{tagLine}</span>
                  </div>
                ) : (
                  <>
                    <div className="duo_detail_even_wrapper">
                      <StyledInput
                        label="소환사이름"
                        placeholder="소환사 명을 입력해주세요"
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
                        placeholder="태그를 입력해주세요(#제외)"
                        mode="dark"
                        label="태그"
                        value={tag}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="duo_detail_even_wrapper">
                <MainPosition />
                {!ticketMode && <SeekPosition />}
              </div>
              {!ticketMode && (
                <>
                  <div className="duo_detail_even_wrapper">
                    <SeekTier />
                    <div className="duo_detail_wrapper duo_detail_recent_wrapper">
                      <div className="duo_detail_title">최근 전적</div>
                      {recentMatches.length > 0 ? (
                        <>
                          <RecentChampComp size={48} data={recentMatches} />
                        </>
                      ) : (
                        <span>최근 전적이 없습니다.</span>
                      )}
                    </div>
                  </div>
                  <div className="duo_detail_wrapper">
                    <div className="duo_detail_title">게임 타입</div>
                    {getGameType(duoQueueId)}
                  </div>
                </>
              )}
              <div className="duo_memo duo_detail_wrapper">
                <div className="duo_detail_title">메모</div>
                {ticketMode ? (
                  <textarea
                    value={userMemo}
                    onChange={(e) => setUserMemo(e.target.value)}
                    maxLength={50}
                  ></textarea>
                ) : (
                  <div className="duo_detail_memo">{memo}</div>
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
        <CommonModal
          showModal={showAcceptModal}
          title="듀오 승인!"
          message={"듀오를 승인하셨습니다! 인게임에서 연락해보세요."}
          onDisapppear={() => {
            setShowAcceptModal(false);
            window.location.reload();
          }}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
