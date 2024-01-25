import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PostDuo } from "../api/apis";
import { LINE_LIST, TIER_TYPE_LIST } from "../constants/Enum";
import { IDuoPost, IDuoQueueId, ILineType, ITierType } from "../types/types";
import CommonModal from "./CommonModal";
import "./DuoModal.scss";
import StyledInput from "./StyledInput";

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
  const [showComplete, setShowComplete] = useState(false);

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
      setShowComplete(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrMsg(e.response?.data.message);
        setShowErrModal(true);
      }
    }
  }

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

  const MainPosition = useCallback(() => {
    return (
      <div className="select_my_line duo_wrapper">
        <div className="duo_title">주 포지션</div>
        <div
          onClick={(e) => {
            e.preventDefault();
            Setter(lines, setLines, e.target.value);
          }}
          className={`select_wrapper`}
        >
          {LINE_LIST.map((v, i) => {
            return (
              <button
                type="button"
                className={getPositionClassName(lines, v)}
                value={v}
              >
                <img src={`/Position_${v.toLowerCase()}.png`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }, [lines]);

  const SeekPosition = useCallback(() => {
    return (
      <div className="select_my_line duo_wrapper">
        <div className="duo_title">찾는 포지션</div>
        <div
          onClick={(e) => {
            e.preventDefault();
            Setter(wishLines, setWishLines, e.target.value);
          }}
          className={`select_wrapper`}
        >
          {LINE_LIST.map((v, i) => {
            return (
              <button
                type="button"
                className={getPositionClassName(wishLines, v)}
                value={v}
              >
                <img src={`/Position_${v.toLowerCase()}.png`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }, [wishLines]);

  const SeekTier = useCallback(() => {
    return (
      <div className="select_wish_rank duo_wrapper">
        <div className="duo_title">찾는 랭크</div>
        <div
          className={`select_wrapper `}
          onClick={(e) => {
            e.preventDefault();
            Setter(wishTiers, setWishTiers, e.target.value);
          }}
        >
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
    );
  }, [wishTiers]);

  return show ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onDisapppear();
      }}
      className="duo_modal_outer_wrapper"
    >
      <div className="duo_modal_middle_wrapper">
        <div
          onClick={(e) => e.stopPropagation()}
          className="duo_modal_inner_wrapper"
        >
          <div className="duo_modal_header">
            <span
              onClick={() => {
                onDisapppear();
              }}
            >
              x
            </span>
          </div>
          <div className="duo_modal_inner">
            <form>
              <div className="duomodal_name_wrapper duo_wrapper">
                <>
                  <div className="duo_even_wrapper">
                    <StyledInput
                      label="소환사이름"
                      placeholder="소환사 명을 입력해주세요"
                      onChange={(e) => {
                        setGameName(e.target.value);
                      }}
                      mode="dark"
                      value={gameName}
                    />
                    <StyledInput
                      onChange={(e) => {
                        setTagLine(e.target.value);
                      }}
                      placeholder="태그를 입력해주세요(#제외)"
                      mode="dark"
                      label="태그"
                      value={tagLine}
                    />
                  </div>
                </>
              </div>
              <div className="duo_even_wrapper">
                <MainPosition />
                <SeekPosition />
              </div>
              <div className="duo_memo duo_wrapper">
                <SeekTier />
              </div>
              <div className="duo_memo duo_wrapper">
                <div className="duo_title">메모</div>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  maxLength={50}
                ></textarea>
              </div>
              <div className="duo_submit_btn_wrapper duo_wrapper">
                <button
                  className="duo_submit_btn"
                  onClick={() => {
                    postDuo();
                  }}
                  type="button"
                >
                  신청
                </button>
              </div>
            </form>
          </div>
        </div>
        <CommonModal
          showModal={showErrModal}
          title="에러 발생"
          message={errMsg}
          onDisapppear={() => setShowErrModal(false)}
        />
        <CommonModal
          showModal={showComplete}
          title="듀오 찾기 생성 완료!"
          message={"듀오 찾기가 성공적으로 생성 완료 되었습니다!"}
          onDisapppear={() => {
            setShowComplete(false);
            onDisapppear();
          }}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
